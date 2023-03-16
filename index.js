const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    { name: "title", message: "Enter project title" },
    { name: "desc", message: "Enter project description" },
    {
      name: "list",
      message:
        "If you have list of description items? Use - to separate items, do not include spaces.",
    },
    { name: "install", message: "Enter installation details" },
    {
      name: "installList",
      message:
        "If you have list of installation items? Use - to separate items, do not include spaces.",
    },
  ])
  .then((data) => {
    let title = `${data.title}`;
    let desc = `\n${data.desc}`;
    // formatting the list of items appropriately
    let listOfItems = `${data.list.replace(/\-/g, "\n- ")}`;
    let install = `\n ${data.install}`;
    // formatting the list of items appropriately
    let installListOfItems = `${data.installList.replace(/\-/g, "\n- ")}`;

    // compiling all items
    let compiled = `# ${title} 
## Description
${desc}
${listOfItems}
${install === "" ? "" : `## Installation \n ${install}`}
${installListOfItems}
    `;

    fs.writeFile("README.md", compiled, (err) => {
      err ? console.log(err) : console.log("Success!");
    });
  });
