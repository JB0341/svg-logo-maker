const inquirer = require('inquirer');
const fs = require('fs');
const generateLogo = require('./utils/generateLogo');


// Main function to prompt the user
    const questions = [
        {
            type: 'input',
            name: 'color',
            message: 'Enter the logo color (e.g., red, blue, #ffcc00):',
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape for the logo:',
            choices: ['Circle', 'Rectangle', 'Triangle'],
        },
        {
            type: 'input',
            name: 'text',
            message: 'Enter the text for the logo:',
        },
        {
            type: 'input',
            name: 'fileName',
            message: 'Enter the file name to save the logo (without extension):',
        },
    ]);

function writeToFile(fileName, data) {
    let content = generateLogo(data);
    fs.writeFile(fileName, content, function(error) {
        if (error) {
            return console.log(error);
        }
        console.log('logo generated');
    });
}

function init() {
    inquirer.createPromptModule(questions).then(function (data) {
        let fileName = 'logo.svg';
        writeToFile(fileName, data);
    });
}

init();
