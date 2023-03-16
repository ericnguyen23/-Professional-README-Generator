const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    { name: "title", message: "Enter project title" },
    { name: "desc", message: "Enter project description" },
    { name: "list", message: "If you have list items, enter here" },
    { name: "install", message: "Enter installation details" },
  ])
  .then((data) => {
    let title = `${data.title}`;
    let desc = `\n${data.desc}\n`;
    let listOfItems = data.list.replace(/\./gi, "\n");
    let install = `\n${data.install}`;

    // compiling all items
    let compiled = `# ${title} 
## Description
${desc}
${listOfItems}
## Installation
${install}
    `;

    fs.writeFile("README.md", compiled, (err) => {
      err ? console.log(err) : console.log("Success!");
    });
    // fs.appendFile("README.md", desc, (err) => {
    //   err ? console.log(err) : console.log("Success!");
    // });
  });
