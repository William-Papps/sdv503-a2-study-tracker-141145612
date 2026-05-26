const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('===== Study Tracker =====');
console.log('1. Add Study Session');
console.log('2. List Study Sessions');
console.log('3. Show Total Minutes');
console.log('4. Exit');

const studySessions = [];

rl.question('Choose an option: ', (choice) => {

    if (choice === '1'){
        rl.question("Enter your study topic: ", (studyTopic) => {
            if (studyTopic.trim() === "") {
                console.log("Error: You entered nothing for study topic");
                rl.close();
                return;
            }
            rl.question("Enter the amount of minutes studied: ", (studiedMinutes) => {
                const newStudySession = {
                    topic: studyTopic,
                    minutes: Number(studiedMinutes),
                };

                studySessions.push(newStudySession);
                console.log("New Study Session Saved Succesfully");
                console.log(studySessions);
                rl.close();
            });
        });
    } else if (choice === "2"){
        // Empty adding in later
        rl.close();
    } else if (choice === "3"){
        // Empty adding in later
        rl.close();
    } else if (choice === "4"){
        // Empty adding in later
        rl.close();
    } else {
    rl.close();
    }
});