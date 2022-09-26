require('dotenv').config();
const Target = require('../model/Target');
const scrapeCourse = require('../util/scrape');

const getAllTarget = async (req, res) => {
    try{
        const target = await Target.find(req.query);
        res.status(200).json(target);
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
        const ending = email.split('@')[1];
        if(!ending){
            throw new Error("You don't even provide @ ???");
        }
        const [symbol, domain] = ending.split('.');
        if(!domain){
            throw new Error("You don't even provide . ???");
        }
        if(symbol.toLowerCase() !== "usc" || domain.toLowerCase() !== "edu"){
            throw new Error("You are not trojan, are you bruins sneaking around ?!!");
        }

        // need further validation to see if you're true trojan

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

module.exports = {
    getAllTarget,
    addCourse,
    getCourse,
    deleteCourse
}