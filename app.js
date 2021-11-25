const fs = require( 'fs');
const generatePage = require('./src/page-template');


/*const pageHTML = generatePaged(name, html);
//console.log(commandLineArgs)

fs.writeFile('./index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log( 'Portfolio complete!');
});*/
const inq = require('inquirer');


const promptUser = () => {
    return inq.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if(nameInput)
                    return true;
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username (Required)',
            validate: githubName => {
                if(githubName)
                    return true;
                else {
                    console.log('Please enter your Github username');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if(confirmAbout)
                    return true;
                else 
                    return false;
            }
        }
    ]);
};

const promptProject = portfolioData => {
    if(!portfolioData.projects)
        portfolioData.projects = [];

    console.log(`
    =================
    Add a New Project
    =================
    `);

    return inq.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectName => {
                if(projectName)
                    return true;
                else {
                    console.log('Please enter a project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: description => {
                if(description)
                    return true;
                else {
                    console.log('Please enter a description for your project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project (Required)',
            validate: githubLink => {
                if(githubLink)
                    return true;
                else {
                    console.log('Please enter your Github link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData)
        if(projectData.confirmAddProject)
            return promptProject(portfolioData);
        else 
            return portfolioData;
    });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
//console.log(commandLineArgs)

fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw err;

    console.log('Portfolio complete!');
});
});