const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('\n===== Study Tracker =====');
console.log('1. Add Study Session');
console.log('2. List Study Sessions');
console.log('3. Show Total Minutes');
console.log('4. Exit');

rl.question('Choose an option: ', (choice) => {

    console.log(`You selected option ${choice}`);

    rl.close();
});