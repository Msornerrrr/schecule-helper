require('dotenv').config();
// const pLimit = require('p-limit');

const sendMessage = require('./util/send');
const scrapeCourse = require('./util/scrape');
const courseList = require('./db/target');

// main async function
const main = async () => {
    // some global setting
    const term = "20223";
    const baseUrl = `https://classes.usc.edu/term-${term}/course/`;

    // user expect spots -> 0
    // user expect pros -> 1

    /* concurrent
    const arr = [];
    for(course in courseList){
        arr.push(scrapeCourse(baseUrl + course));
    }
    const sectionList = await Promise.all(arr);
    console.log(sectionList)
    */

    // for each course
    for(course in courseList){
        // fetch the course data from usc website
        const sectionList = await scrapeCourse(baseUrl + course);

        // for each section of a course
        for(section in courseList[course]){
            // whether if spots or if professor available
            const triggerType = courseList[course][section];
            const { professor, type, current, all, available } = sectionList[section];

            // when we check if there's available spot
            if(triggerType == 0){
                if(available){
                    // prepare and send messages
                    const title = `${all - current} spots open for ${course.toUpperCase()}`;
                    const message = `
                        Course Info: ${course.toUpperCase()}\n
                        Course Section: ${section}\n
                        Course Instructor: ${professor}\n
                        Course Type: ${type}\n
                        Click the link to quickly nevigate and register for your course:\n
                        ---> https://my.usc.edu/ <---
                        \n
                        You are automatically unsubscribed from this course, if you wanna re-subscribe, click below:\n
                        ---> some link <---
                    `;
                    await sendMessage(title, message);

                    // unsubscribe that course
                    delete courseList[course][section];
                }
            }
            
            // when we check if professor is available
            else if(triggerType == 1){
                if(professor){
                    // prepare and send messages
                    const title = `${professor} for ${course.toUpperCase()}`;
                    const message = `
                        Course Info: ${course.toUpperCase()}\n
                        Course Section: ${section}\n
                        Course Instructor: ${professor}\n
                        Course Type: ${type}\n
                        Professor ${professor} is gonna teach ${course.toUpperCase()} this semester for section ${section}\n
                        Click the link to ratemyprofessors to see his/her/their ratings:\n
                        ---> https://www.ratemyprofessors.com/ <---
                    `;
                    await sendMessage(title, message);

                    // unsubscribe that course
                    delete courseList[course][section];
                }
            }
        }
    }
    // update database (targeted courses)
    console.log(courseList);

}

main();