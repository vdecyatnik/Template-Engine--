const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// Ask for manager info
function askUserForManagerInfo() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is your managers name?",
        name: "name",
      },

      {
        type: "input",
        message: "What is your managers employee id?",
        name: "id",
      },

      {
        type: "input",
        message: "What is your managers email?",
        name: "email",
      },

      {
        type: "input",
        message: "What is your managers office number?",
        name: "officeNumber",
      },
    ])
    .then((managerData) => {
      //
      const newManager = new Manager(
        managerData.name,
        managerData.email,
        managerData.id,
        managerData.officeNumber
      );

      employeeList.push(newManager);

      askUserForEmployeeType();
    });
}

// Ask user for next employee type
function askUserForEmployeeType() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What type of employee would you like to add?",
        choices: ["Intern", "Engineer", "None"],
        name: "type",
      },
    ])
    .then((response) => {
      
      if (response.type === "Engineer") {
        askUserForEngineerInfo();
      } else if (response.type === "Intern") {
        
        askUserForInternInfo();
      } else {
       createhtmlFile();
      }
    });
}
function askUserForEngineerInfo() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineers name?",
        name: "name", 
      },

      {
        type: "input",
        message: "What is your engineers employee id?",
        name: "id",
      },

      {
        type: "input",
        message: "What is your engineers  Email?",
        name: "email",
      },

      {
        type: "input",
        message: "What is your engineers github username?",
        name: "github",
      },
    ])
    .then((engineerData) => {
      const newEngineer = new Engineer(
        engineerData.name,
        engineerData.email,
        engineerData.id,
        engineerData.github
      );

      employeeList.push(newEngineer);

      askUserForEmployeeType();
    });
}

function askUserForInternInfo() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is your interns name?",
        name: "name",
      },

      {
        type: "input",
        message: "What is your interns employee id?",
        name: "id",
      },

      {
        type: "input",
        message: "What is your interns Email?",
        name: "email",
      },

      {
        type: "input",
        message: "What College do you attend?",
        name: "school",
      },
    ])
    .then((internData) => {
      const newIntern = new Intern(
        internData.name,
        internData.email, 
        internData.id,
        internData.school, 
      );
      
      employeeList.push(newIntern);

      askUserForEmployeeType();
    });
}

function createhtmlFile() {
  const htmlContent = render(employeeList);

  //User the FS module to create the output file

  fs.writeFile('teamMembers.html', htmlContent, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });


}

askUserForManagerInfo();

// function createhtmlFile();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
