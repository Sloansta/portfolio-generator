/*const fs = require( 'fs');
const generatePage = require('./src/page-template');


const pageHTML = generatePaged(name, html);
//console.log(commandLineArgs)

fs.writeFile('./index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log( 'Portfolio complete!');
});*/
const inq = require('inquirer');


inq.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    }
]).then(answers => console.log(answers));
