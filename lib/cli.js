const inquirer = require("inquirer");
const { Circle, Triangle, Square } = require("./Shape.js");
const { writeFile } = require("fs");

class CLI {
    run() {
        inquirer
            .prompt([
                {
                    name: 'text',
                    message: 'what text would you like to display?',
                },
                {
                    name: 'textColor',
                    message: 'what color should the text be?',
                },
                {
                    type: 'list',
                    name: 'shapeType',
                    message: 'what shape would you like?',
                    choices: ['circle', 'triangle', 'square'],
                },
                {
                    name: 'shapeColor',
                    message: 'what color should the shape be?'
                }
            ])
            .then(answers => {
                let shape;
                if (answers.shapeType === 'circle') {
                    shape = new Circle(answers.text, answers.shapeColor, answers.textColor);
                } else if (answers.shapeType === 'triangle') {
                    shape = new Triangle(answers.text, answers.shapeColor, answers.textColor);
                } else {
                    shape = new Square(answers.text, answers.shapeColor, answers.textColor);
                }

                const logo = shape.render();
                writeFile('logo.svg', logo, (err) => {
                    if (err) {
                        console.log(err);
                    };

                    console.log('logo.svg created');
                })

            });

    }
}

module.exports = CLI;