require('dotenv').config();

// const jwt = require('jsonwebtoken');
// const sendMessage = require('../util/send');

const Target = require('../model/Target');
const scrapeCourse = require('../util/scrape');

const getAllTarget = async (req, res) => {
    try{
        const targets = await Target.find(req.query);

        const count = targets.length;
        const filteredTargets = targets.map(target => {
            const { title, section } = target;
            return { title, section };
        });
        res.status(200).json({ data: filteredTargets, count });
    } catch(err){
        res.status(404).json({ message: err.message });
    }
}

const addCourse = async (req, res) => {
    try{
        const { title, section, email } = req.body;

        const [dept, num] = title.split('-');
        if(num.length != 3){
            throw new Error("Invalid Course Title")
        }
        
        // validate title & section by scraping
        const data = await scrapeCourse(`https://classes.usc.edu/term-${process.env.SEMESTER}/course/${title}`);
        if(!data){
            throw new Error("Course doesn't exist...");
        }
        if(!data[section]){
            throw new Error("Course Section doesn't exist...");
        }

        // validate email
        const uniqueEmails = await Target.distinct('email');
        if(!(email in uniqueEmails)){
            const ending = email.split('@')[1];
            if(!ending){
                throw new Error("You don't even provide @ ???");
            }
            if(ending.toLowerCase() !== "usc.edu"){
                throw new Error("You are not trojan, are you bruins sneaking around ?!!");
            }

            /* email verification on later version
            const token = jwt.sign({ id: _id}, process.env.JWT_SECRET);
            await sendMessage(
                "USC Class Notification: Verify Your Email!", 
                `It's your first time to use the notification helper, so we just wanna verify your email\n
                Please copy and paste the verifying code below\n
                Your code: ${token}\n`, 
                email
            );
            */
        }

        // type valided by mongoose

        const target = await Target.create(req.body);
        res.status(201).json(target);
    } catch(err){
        res.status(409).json({ message: err.message });
    }
}

const getCourse = async (req, res) => {
    try{
        const id = req.params.id;
        const target = await Target.findById(id);
        res.status(200).json(target);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
}

/* delete is disabled
const deleteCourse = async (req, res) => {
    try{
        const id = req.params.id;
        const target = await Target.findByIdAndDelete(id);
        if(!target){
            throw new Error(`No Target with id ${id}`);
        }
        res.status(200).send();
    } catch(err){
        res.status(404).json({message: err.message});
    }
}
*/

module.exports = {
    getAllTarget,
    addCourse,
    getCourse,
}