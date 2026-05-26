const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to display menu options easily
function showMenu() {
console.log('===== Study Tracker =====');
console.log('1. Add Study Session');
console.log('2. List Study Sessions');
console.log('3. Show Total Minutes');
console.log('4. Exit');
}


const studySessions = [];

// Function asking user to try again after fail
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

// Function asking user for study topic
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

// Function to ask user for study minutes input
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
        askMenuChoice();
    });
}

// Function to list all recorded study sessions
function listStudySessions(){
    if (studySessions.length === 0){
        console.log("There are no study sessions recorded yet.");
        askMenuChoice();
        return;
    }

    console.log("Recorded Study Sessions List:");
    studySessions.forEach((studySessions, index) => {
        console.log(`${index + 1}. ${studySessions.topic} - ${studySessions.minutes} minutes`);
    });
    askMenuChoice();
}

// Function to show total minutes studied
function showTotalMinutes() {
    let totalMinutes = 0;

    for(let i = 0; i < studySessions.length; i ++) {
        totalMinutes += studySessions[i].minutes;
    }
    
    console.log(`Total time studied is: ${totalMinutes} minutes`);

    askMenuChoice();
}

// Function to navigate menu
function askMenuChoice(){
    showMenu();

    rl.question('Choose an option: ', (choice) => {
    if (choice === '1') {
        askForStudyTopic();
    } else if (choice === "2") {
        listStudySessions();
    } else if (choice === "3") {
        showTotalMinutes();
    } else if (choice === "4") {
        console.log("Application closed.");
        rl.close();
    } else {
        console.log("Invalid Menu Option Try Again:");
        askMenuChoice();
    }
});

}

// Calls the start of the program
askMenuChoice();