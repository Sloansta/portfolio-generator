const fs = require( 'fs');
const generatePage = require('./src/page-template.js');

const commandLineArgs = process.argv.slice(2, process.argv.length);

const [name, github] = commandLineArgs;

//console.log(commandLineArgs)

fs.writeFile('./index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log( 'Portfolio complete!');
});

