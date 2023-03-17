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
    { name: "githubName", message: "Provide github username:" },
    { name: "email", message: "Provide email:" },
  ])
  .then((data) => {
    let title = `${data.title}`;
    let desc = `${data.desc}`;
    let tableContents = `${data.tableOfContents}`;
    let formattedToc = "";
    let install = `${data.install}`;
    let installListOfItems = `${data.installList.replace(/\-/g, "\n- ")}`;
    let usage = `${data.usage}`;
    let credits = `${data.credits}`;
    let tests = `${data.tests}`;
    let license = `${data.license}`;
    let licenseContent;
    let licenseBadge;
    let username = `${data.githubName}`;
    let email = `${data.email}`;

    // format table of contents
    formatToc = (string) => {
      let itemsArr = string.split(",");
      itemsArr.forEach((item) => (formattedToc += `- [${item}](#${item})\n`));
    };

    formatToc(tableContents);

    // function to omit section heading if no text has been entered
    checkForContent = (promptData, sectionTitle) => {
      // if it's the title, just display the title
      if (promptData === title) {
        return promptData.length === 0 ? "" : sectionTitle;
      } else if (promptData === username) {
        return promptData.length === 0
          ? ""
          : `${sectionTitle}\n\n[Github Profile](https://github.com/${username})
For any additional questions, please email me at ${email}`;
      }
      return promptData === "" || promptData === undefined
        ? ""
        : `${sectionTitle}\n\n${promptData}`;
    };

    // check licenses
    switch (license) {
      case "MIT":
        licenseContent = lic.MIT.content;
        licenseBadge = lic.MIT.badge;
        break;
      case "BSD":
        licenseContent = lic.BSD.content;
        licenseBadge = lic.BSD.badge;
        break;
      case "GPL":
        licenseContent = lic.GPL.content;
        licenseBadge = lic.GPL.badge;
        break;
    }

    // ${checkForContent(tableContents, "## Table of Contents")}

    // compiling all items
    const compiled = `${licenseBadge}
[License](#License)
${checkForContent(title, `# ${title}`)}
${checkForContent(desc, "## Description")}
${checkForContent(formattedToc, "## Table Of Contents")}
${checkForContent(install, "## Installation")}
${checkForContent(installListOfItems, "### Installation Steps")}
${checkForContent(usage, "## Usage")}
${checkForContent(credits, "## Credits")}
${checkForContent(tests, "## How To Test")}
${checkForContent(licenseContent, "## License")}
${checkForContent(username, "## Questions")}
`;

    fs.writeFile("README.md", compiled, (err) => {
      err ? console.log(err) : console.log("Success!");
    });
  });
