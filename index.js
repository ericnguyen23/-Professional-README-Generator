const lic = require("./licenses.js");
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
    {
      type: "checkbox",
      name: "license",
      message: "Select license:",
      choices: ["MIT", "BSD", "GPL"],
    },
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
    let license = `${data.license}`;
    let finalLicense;

    // function to omit section heading if no text has been entered
    checkForContent = (promptData, sectionTitle) => {
      // if it's the title, just display the title
      if (promptData === title) {
        return promptData.length === 0 ? "" : sectionTitle;
      }
      return promptData.length === 0 ? "" : `${sectionTitle}\n\n${promptData}`;
    };

    // check licenses
    switch (license) {
      case "MIT":
        finalLicense = lic.MIT;
        break;
      case "BSD":
        finalLicense = lic.BSD;
        break;
      case "GPL":
        finalLicense = lic.GPL;
        break;
    }

    // compiling all items
    const compiled = `${checkForContent(title, `# ${title}`)}
${checkForContent(desc, "## Description")}
${checkForContent(tableContents, "## Table of Contents")}
${checkForContent(install, "## Installation")}
${checkForContent(installListOfItems, "### Installation Steps")}
${checkForContent(usage, "## Usage")}
${checkForContent(credits, "## Credits")}
${checkForContent(tests, "## How To Test")}
${checkForContent(finalLicense, "## License")}
    `;

    fs.writeFile("README.md", compiled, (err) => {
      err ? console.log(err) : console.log("Success!");
    });
  });
