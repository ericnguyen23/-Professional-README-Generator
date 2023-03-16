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
    let title = `${data.title}`;
    let desc = `${data.desc}`;
    // formatting the list of items appropriately
    let tableContents = `${data.tableOfContents.replace(/\-/g, "\n- ")}`;
    let install = `${data.install}`;
    // formatting the list of items appropriately
    let installListOfItems = `${data.installList.replace(/\-/g, "\n- ")}`;
    let usage = `${data.usage}`;
    let credits = `${data.credits}`;
    let tests = `${data.tests}`;

    // function to include appropriate heading if text has been entered
    checkForContent = (promptData, sectionTitle) => {
      // console.log(`data="${promptData}"`);
      return promptData.length === 0
        ? ""
        : `${sectionTitle} \n \n ${promptData}`;
    };

    // compiling all items
    let compiled = `${checkForContent(title, `# ${title}`)}
${checkForContent(desc, "# Description")}
${checkForContent(tableContents, "## Table of Contents")}
${checkForContent(install, "## Installation")}
${checkForContent(installListOfItems, "### Installation Steps")}
${checkForContent(usage, "## Usage")}
${checkForContent(credits, "## Credits")}
${checkForContent(tests, "## How To Test")}
    `;

    fs.writeFile("README.md", compiled, (err) => {
      err ? console.log(err) : console.log("Success!");
    });
  });
