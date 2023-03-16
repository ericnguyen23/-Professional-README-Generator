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
    let desc = `\n${data.desc}`;
    let listOfItems = data.list.replace(/\-/g, "\n - ");
    let install = `\n${data.install}`;

    // function formatList = (string) => {

    // }

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
  });
