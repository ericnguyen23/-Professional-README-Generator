const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    { name: "title", message: "Enter project title:" },
    { name: "desc", message: "Enter project description:" },
    {
      name: "tableOfContents",
      message:
        "Include a table of contents? Use - to separate items, do not include spaces.",
    },
    { name: "install", message: "Provide installation details:" },
    {
      name: "installList",
      message:
        "If you have list of installation items? Use - to separate items, do not include spaces.",
    },
    { name: "usage", message: "Provide usage details:" },
    { name: "credits", message: "Provide credit to collaborators:" },
    { name: "tests", message: "Provide test instructions:" },
  ])
  .then((data) => {
    let title = `${data.title}\n`;
    let desc = `${data.desc}\n`;
    // formatting the list of items appropriately
    let tableContents = `${data.tableOfContents.replace(/\-/g, "\n- ")}\n`;
    let install = `\n ${data.install}\n`;
    // formatting the list of items appropriately
    let installListOfItems = `${data.installList.replace(/\-/g, "\n- ")}\n`;
    let usage = `\n ${data.usage}\n`;
    let credits = `\n ${data.credits}\n`;
    let tests = `\n ${data.tests}\n`;

    // function to include appropriate heading if text has been entered
    addHeader = (promptData, sectionTitle) => {
      return promptData === "" ? "Empty" : `${sectionTitle} \n ${promptData}`;
    };

    // compiling all items
    let compiled = `# ${title} 
## Description \n
${desc}
${addHeader(tableContents, "## Table Of contents")}
${addHeader(install, "## Installation")}
${addHeader(installListOfItems, "### Installation Steps")}
${addHeader(usage, "## Usage")}
${addHeader(credits, "## Credits")}
${addHeader(tests, "## How To Test")}
    `;

    fs.writeFile("README.md", compiled, (err) => {
      err ? console.log(err) : console.log("Success!");
    });
  });
