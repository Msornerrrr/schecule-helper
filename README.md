# courier-hackathon
1 spot available for class ...

## Inspiration
Many students at USC paying their expensive tuition cannot successfully registered for their desired course.

## What it does
This project allow user to provide their desired course, section, and the email to receive notification once there're spots or  professor available. Once available, it'll send notification to the user ASAP.

## How we built it
I use node.js to build the backend. Utilize express and mongoose to receive and organize user's request. The university didn't provide a course API, so I use puppeteer to scrape school website data, check availability 5 minutes a time, and send emila notification using Courier API.

## Challenges we ran into
The most chalenging part of my app would be the all kinds of authentication. I need to figure out which data should be not visible from general people, how to verify if coruse, section, and email is valid, and etc.
Finally, I could handle any invalid course and section input, but I still need more work for the email validation. 

## Accomplishments that we're proud of
I'm really proud that my friends are already using this app. I'll thank me if they get their course. I realize I can make such a difference with my codes and help so many people.

## What we learned
Through building this app, I enhanced my knowledge in node.js backend in general along with express, mongoose, etc. I also learned how to scarpe website information, which is quite interesting.

## What's next for USC Class Notification
I'll keep updating the app. Add more user authentication and include registration & login. I would also build a front-end for it. In the end, I wish in this app, user could view and organize their desired coruse information in the website.
