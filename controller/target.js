require('dotenv').config();
const Target = require('../model/Target');
const scrapeCourse = require('../util/scrape');


const getAllTarget = async (req, res) => {
    try{
        const target = await Target.find({});
        res.status(200).json(target);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
}

const addCourse = async (req, res) => {
    try{
        const { title, section } = req.body;
        // do a scrape here to prove if it's valid
        const data = await scrapeCourse(`https://classes.usc.edu/term-${process.env.TERM}/course/${title}`);
        if(!data) throw new Error("Course doesn't exist...");
        if(!data[section]) throw new Error("Course Section doesn't exist...");

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