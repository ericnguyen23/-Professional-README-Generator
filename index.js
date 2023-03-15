const fs = require("fs");
const inquirer = require("inquirer");

inquirer.prompt([{ name: "title", message: "README Title?" }]).then((data) => {
  // remove "" marks and add #
  let title = `# ${data.title.replace(/^""+/i, "")}`;

  fs.writeFile("README.md", title, () => {
    err ? console.log(err) : console.log("Success!");
  });
});
