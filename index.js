const inquirer = require('inquirer');
const fs = require('fs');

function generateSVG(color, shape, text) {
    let shapeElement;

    switch (shape.toLowerCase()) {
        case 'circle':
            shapeElement = `<circle cx="150" cy="100" r="80" fill="${color}" />`;
            break;
        case 'rectangle':
            shapeElement = `<rect x="50" y="50" width="200" height="100" fill="${color}" />`;
            break;
        case 'triangle':
            shapeElement = `<polygon points="150,20 30,180 270,180" fill="${color}" />`;
            break;
        default:
            throw new Error('Unknown shape type');
    }

    return `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${shapeElement}
      <text x="150" y="125" font-size="30" text-anchor="middle" fill="white">${text}</text>
    </svg>
  `;
}

// Main function to prompt the user
async function main() {
    const answers = await inquirer.prompt([
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

    const svgContent = generateSVG(answers.color, answers.shape, answers.text);
    const filePath = `${answers.fileName}.svg`;

    fs.writeFileSync(filePath, svgContent);
    console.log(`Logo saved as ${filePath}`);
}


main();
