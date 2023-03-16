const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    { name: "title", message: "Enter project title" },
    { name: "desc", message: "Enter project description" },
  ])
  .then((data) => {
    // remove "" marks and add #
    let title = `# ${data.title.replace(/^""+/i, "")}`;
    let desc = `\n${data.desc}`;

    let compiled = `${title} 
## Description
${desc}
    `;

    fs.writeFile("README.md", compiled, (err) => {
      err ? console.log(err) : console.log("Success!");
    });
    // fs.appendFile("README.md", desc, (err) => {
    //   err ? console.log(err) : console.log("Success!");
    // });
  });
