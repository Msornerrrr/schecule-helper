const sendMessage = require('./send');
const scrapeCourse = require('./scrape');

require('dotenv').config();

// main async function
const main = async () => {
    // some global setting
    const term = "20223";

    // grab course data from user

    const course = "math-425a";
    const section = "39645";

    const url = `https://classes.usc.edu/term-${term}/course/${course}/`;
    const sectionList = await scrapeCourse(url);
    const { professor, type, current, all, available } = sectionList[section];

    /* check if profesor available
    if(professor){
        const title = `Professor ${professor} for ${course.toUpperCase()}`;
        const message = `
            Course Info: ${course.toUpperCase()}\n
            Course Section: ${section}\n
            Course Instructor: ${professor}\n
            Course Type: ${type}\n
            Professor ${professor} is gonna teach ${course.toUpperCase()} this semester for section ${section}\n
            Click the link to ratemyprofessors to see his/her/they ratings:\n
            ---> https://www.ratemyprofessors.com/ <---
        `;
        sendMessage(title, message);
    }
    */

    /* check for available spots
    if(available){
        const title = `${all - current} spots open for ${course.toUpperCase()}`;
        const message = `
            Course Info: ${course.toUpperCase()}\n
            Course Section: ${section}\n
            Course Instructor: ${professor}\n
            Course Type: ${type}\n
            Click the link to quickly nevigate and register for your course:\n
            ---> https://my.usc.edu/ <---
        `;
        sendMessage(title, message);
    }
    */
}

main();