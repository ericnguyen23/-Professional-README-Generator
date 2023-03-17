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
        "Provide a table of contents. Separate each item with a comma with no spaces:",
    },
    { name: "install", message: "Provide installation details:" },
    {
      name: "installList",
      message:
        "Provide a list of installation items. Separate each item with a comma with no spaces:",
    },
    { name: "usage", message: "Provide usage details:" },
    { name: "credits", message: "Provide credit to collaborators:" },
    { name: "tests", message: "Provide test instructions:" },
    {
      type: "list",
      name: "license",
      message: "Select license:",
      choices: ["MIT", "BSD", "GPL"],
    },
    { name: "githubName", message: "Provide github username:" },
    { name: "email", message: "Provide email:" },
  ])
  .then((data) => {
    const {
      title,
      desc,
      tableOfContents,
      install,
      installList,
      usage,
      credits,
      tests,
      license,
      email,
      githubName,
    } = data;

    let formattedToc = "";
    let formattedInstall = "";
    let licenseContent = "";
    let licenseBadge = "";

    // format table of contents
    formatToc = (string) => {
      if (string.length === 0) {
        formattedToc = "";
      } else {
        let itemsArr = string.split(",");
        itemsArr.forEach(
          (item) =>
            (formattedToc += `- [${item}](#${item.replace(/\ /g, "-")})\n`)
        );
      }
    };

    formatToc(tableOfContents);

    // format install list
    formatInstallList = (string) => {
      if (string.length === 0) {
        formattedInstall = "";
      } else {
        let itemsArr = string.split(",");
        itemsArr.forEach((item) => (formattedInstall += `- ${item}\n`));
      }
    };

    formatInstallList(installList);

    // function to omit section heading if no text has been entered
    checkForContent = (promptData, sectionTitle) => {
      // if it's the title, just display the title
      if (promptData === title) {
        return promptData.length === 0 ? "" : sectionTitle;
      } else if (promptData === githubName) {
        return promptData.length === 0
          ? ""
          : `${sectionTitle}\n\n[Github Profile](https://github.com/${githubName})
For any additional questions, please email me at ${email}`;
      }
      return promptData === "" || promptData === undefined
        ? ""
        : `${sectionTitle}\n\n${promptData}`;
    };

    console.log(license);
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

    // compiling all items into one const
    const compiled = `${licenseBadge}
${checkForContent(title, `# ${title}`)}
${checkForContent(desc, "## Description")}
${checkForContent(formattedToc, "## Table Of Contents")}
${checkForContent(install, "## Installation")}
${checkForContent(formattedInstall, "### Installation Steps")}
${checkForContent(usage, "## Usage")}
${checkForContent(credits, "## Credits")}
${checkForContent(tests, "## How To Test")}
${checkForContent(licenseContent, "## License")}
${checkForContent(githubName, "## Questions")}
`;

    fs.writeFile("README.md", compiled, (err) => {
      err ? console.log(err) : console.log("Success!");
    });
  });
