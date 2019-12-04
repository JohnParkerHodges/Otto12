// require packages
const mysql = require("mysql");
const inq = require("inquirer");
const fs = require("fs");


// functions 

//  function to add a department
const addDepartment = () => {
    inq.prompt([{
        type: "input",
        name: "name",
        message: "Department Name?"
    }]).then(answers => {
        connection.query("INSERT INTO Department (name) VALUES (?)", [answers.name], (err, rows) => {
            if (err) throw err;
            console.log(`Added ${answers.name} to Department.`);
            mainMenu();
        });
    })
};

// function to add a role
const addRole = () => {
    inq.prompt([{
            type: "input",
            message: "Title?",
            name: "title"
        },
        {
            type: "input",
            message: "Salary?",
            name: "Salary"

        },
        {
            type: "list",
            message: "Department?",
            name: "Department",
            choices: function(answers) {
                return { name: "ParkerExpo", value: 1, short: "ParkerExpo" }

            }


        }
    ]).then(answers => {
        console.log(answers);
    })
};

// fucntion to add a employee
const addEmployee = () => {
    console.log("Add an Employee")
};

const mainMenu = () => {
    inq.prompt([{

        type: "list",
        name: "action",
        message: "What Would You Like To Do?",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee"
        ]

    }]).then(answers => {
        switch (answers.action) {

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            default:
                console.log("Exiting...");
        }
    });
};

// connection settings
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "Otto"
});

connection.connect(function(err) {
    if (err) throw err;
    mainMenu();


});