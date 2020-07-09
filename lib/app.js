/** @format */

const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");
const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");
const { run } = require("jest");

const writeFileAsync = util.promisify(fs.writeFile);

//use inquirer to create instances of engineer manager and intern, pass those into html renderer
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



class APP {
  constructor() {
    this.employees = [];
  }

  run() {
    console.log("Please build your team.");
    this.menu();
  }

  menu() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Add a manager?",
          choices: ["Yes", "No", "Quit"],
          default: "Yes",
        },
      ])
      .then((answers) => {
        switch (answers.choice) {
          case "Yes":
            return this.createManager();
          case "No":
            return this.generateHtml();
          default:
            console.log("good bye!");
            process.exit(0);
        }
      });
  }

  createManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is your managers name?",
        },
        {
          type: "input",
          name: "id",
          message: "What is your managers ID?",
        },
        {
          type: "input",
          name: "email",
          message: "What is your managers email?",
        },
        {
          type: "input",
          name: "officeNumber",
          message: "What is your managers office number?",
        },
      ])
      .then((answers) => {
        // create a new employee
        const { name, id, email, officeNumber } = answers;
        const newManager = new Manager(name, id, email, officeNumber);
        // add it to employees
        this.employees.push(newManager);
        // go back to the menu
        this.menu();
      });
  }

  generateHtml() {
    // generate a string of  html using the htmlRenderer
    const html = render(this.employees);

    // get an absolute path for the output file
    const file = path.join(__dirname, "../output/team.html");
    writeFileAsync(file, html)
      .then(() => {
        console.log(`Created ${file}.`);
        process.exit(0);
      })
      .catch((error) => {
        console.log(error);
        console.log("Unable to create team file. Try again.");
        process.exit(1);
      });
  }
}

module.exports = APP;



// what is your managers name
//what is your managers id
// what is your managers email
//what is your managers office number
//which type of team memeber would you like to add?  choice- engineer, intern, i dont wanna add anymore
//
//what is yuour engineers name
//what is your engineers id
// what is your engineers email
//what is your engineers github
// then whicfh next again
//
//what is your interns name
// waht is your interns id
//what is your [interns] email
//what is your interns school
//then which again
//.. done  
//thehn ovber and file should be generated
//in the output folder.. open it in browser