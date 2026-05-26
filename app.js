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

function askToTryAgain(retryFunction) {
    rl.question("Would you like to retry? (y/n): ", (answer) => {

        if (answer.toLowerCase() === 'y') {
            retryFunction();
        } else {
            console.log("Application closed.");
            rl.close();
        }

    });
}

function askForStudyTopic() {

    rl.question("Enter your study topic (Type 'exit' to quit): ", (studyTopic) => {
        if (studyTopic.toLowerCase() === 'exit'){
            console.log("Application Exited.")
            rl.close();
            return;
        }

        if (studyTopic.trim() === "") {
            console.log("Error: You entered an invalid name for study topic");

            askToTryAgain(askForStudyTopic);
            return;
        }

        askForStudyMinutes(studyTopic);

    });
}

function askForStudyMinutes(studyTopic) {

    rl.question("Enter the amount of minutes studied (Type 'exit' to quit): ", (studiedMinutes) => {
        if (studiedMinutes.toLowerCase() === "exit") {
            console.log("Application Exited.")
            rl.close();
            return;
        }


        const minutesIntoNumber = Number(studiedMinutes);

        if (
            Number.isNaN(minutesIntoNumber) ||
            !Number.isInteger(minutesIntoNumber) ||
            minutesIntoNumber <= 0
        ) {
            console.log("Error: You entered an invalid amount of minutes");

            askToTryAgain(() => askForStudyMinutes(studyTopic));
            return;
        }
        const newStudySession = {
            topic: studyTopic,
            minutes: minutesIntoNumber,
        };
        studySessions.push(newStudySession);
        console.log("New Study Session Saved Successfully");
        console.log(studySessions);
        rl.close();
    });
}

rl.question('Choose an option: ', (choice) => {
    if (choice === '1') {
        askForStudyTopic();
    } else if (choice === "2") {
        // Empty adding in later
        rl.close();
    } else if (choice === "3") {
        // Empty adding in later
        rl.close();
    } else if (choice === "4") {
        console.log("Application closed.");
        rl.close();
    } else {
        rl.close();
    }
});