const puppeteer = require('puppeteer');

const scrapeCourse = async (url) => {
    // starter
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
        // store courses information
        const info = {};

        // query to the base container of course section
        const coursesContainer = document.querySelector("#content-main > div.course-table > div.table-wrapper > div.scrollable > table > tbody");

        // if the desired course is provided
        if(!coursesContainer){
            return {
                message: "Current course is NOT available for this semester..."
            };
        }

        // for each course element
        for(let i = 1; i < coursesContainer.children.length; i++){
            const course =  coursesContainer.childNodes[i]

            // get professor, type, and section
            const section = course.dataset.sectionId;
            const professor = course.childNodes[6].textContent;
            const type = course.childNodes[2].textContent;
            

            // deal with course available space
            let current = 0;
            let all = 0;
            let available = false;
            const registered = course.childNodes[5].textContent;
            if(registered != "Canceled" && registered != "Closed"){
                current = parseInt(registered.split(' ')[0]);
                all = parseInt(registered.split(' ')[2]);
                available = !(current >= all);
            }
            
            info[section] = { professor, type, current, all, available };
        }
        return info;
    });

    await browser.close();

    return data;
}

module.exports = scrapeCourse;