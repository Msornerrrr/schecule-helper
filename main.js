require('dotenv');

const Target = require('./model/Target');
const scrapeCourse = require('./util/scrape');
const sendMessage = require('./util/send');


const checkSpots = async (
    { _id, email, title, section },
    { professor, form, current, all, available }
) => {
    // when we check if there's available spot
    if(available){
        // prepare and send messages
        const sentTitle = `${all - current} spots open for ${title.toUpperCase()}`;
        const sentessage = `
            Course Info: ${title.toUpperCase()}\n
            Course Section: ${section}\n
            Course Instructor: ${professor}\n
            Course Form: ${form}\n
            Click the link to quickly nevigate and register for your course:\n
            ---> https://my.usc.edu/ <---
            \n
            You are automatically unsubscribed from this course, if you wanna re-subscribe, click below:\n
            ---> some link <---
        `;
        await sendMessage(sentTitle, sentessage, email);

        // unsubscribe that course
        await Target.findByIdAndDelete(_id);
    }
};

const checkProfessor = async (
    { _id, email, type, title, section },
    { professor, form, current, all, available }
) => {
    if(professor){
        // prepare and send messages
        const sentTitle = `${professor} for ${title.toUpperCase()}`;
        const sentMessage = `
            Course Info: ${title.toUpperCase()}\n
            Course Section: ${section}\n
            Course Instructor: ${professor}\n
            Course Type: ${form}\n
            Professor ${professor} is gonna teach ${title.toUpperCase()} this semester for section ${section}\n
            Click the link to ratemyprofessors to see his/her/their ratings:\n
            ---> https://www.ratemyprofessors.com/ <---
        `;
        await sendMessage(sentTitle, sentMessage, email);

        // unsubscribe that course
        await Target.findByIdAndDelete(_id);
    }
}

// main async function
const main = async () => {
    // some global setting
    const baseUrl = `https://classes.usc.edu/term-${process.env.SEMESTER}/course/`;

    // user expect spots -> 0
    // user expect pros -> 1

    // get all unique courses in the database
    const titleList = await Target.distinct('title');

    // for each course title
    titleList.forEach(async (title) => {
        // get course data
        const courseData = await scrapeCourse(baseUrl + title);

        // get all section list in demand
        const sectionList = await Target.find({ title }).distinct('section');
        
        sectionList.forEach(async (section) => {
            // get course data
            // sectionInfo: { professor, form, current, all, available }
            const sectionInfo = courseData[section]

            // get checkList: who to send, which type
            const checkList = await Target.find({ title, section });
            checkList.forEach(check => {
                // check: { _id, email, type, title, section }
                const type = check.type;
                if(type === 0) checkSpots(check, sectionInfo);
                else if(type === 1) checkProfessor(check, sectionInfo);
            })
        });
    });
}

module.exports = main;
