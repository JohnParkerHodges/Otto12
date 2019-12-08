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
const addRoles = () => {
    connection.query("SELECT * FROM Department", (err, rows) => {
        if (err) throw err;

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
                choices: function() {
                    return rows.map(row => {
                        return { name: row.name, value: row.id, short: row.name };
                    })
                }
            }
        ]).then(answers => {
            connection.query('INSERT INTO Roles (title, Salary, Department_id) VALUES (?,?,?)', [answers.title, answers.Salary, answers.Department], (err, data) => {
                if (err) throw err;
                mainMenu();
            })
        })

    })

};

// fucntion to add a employee
const addEmployee = () => {
    connection.query("SELECT * FROM Roles", (err, Roles) => {
        if (err) throw err;
        connection.query("SELECT * FROM Employee", (err, Employee) => {
            if (err) throw err;

            inq.prompt([{
                    type: "input",
                    message: "First Name?",
                    name: "First_Name"
                },
                {
                    type: "input",
                    message: "Last Name?",
                    name: "Last_Name"
                },
                {
                    type: "list",
                    message: "Role?",
                    name: "RoleId",
                    choices: function() {
                        return Roles.map(Role => {
                            return { name: Role.Title, value: Role.id, short: Role.Title };
                        })
                    }
                },
                {
                    type: "list",
                    message: "Manager?",
                    name: "ManagerId",
                    choices: function() {
                        return Employee.map(Employee => {
                            return { name: `${Employee.First_Name} , ${Employee.Last_Name}`, value: Employee.id, short: Employee.Last_Name };
                        });
                    }
                }
            ]).then(answers => {
                connection.query('INSERT INTO Employee (First_Name, Last_Name, Role_id, Manager_id) VALUES (?,?,?,?)', [answers.First_Name, answers.Last_Name, answers.RoleId, answers.ManagerId],
                    (err, results) => {
                        if (err) throw err;
                        mainMenu();
                    })
            })


        })
    })
};

const viewEmployees = () => {
    connection.query(`SELECT Emp.First_Name, Emp.Last_Name, R.Title AS Roles_Title, CONCAT(mgr.First_Name, '', mgr.Last_Name) AS Managers_name
    FROM Employee AS Emp
    LEFT JOIN Roles AS r ON Emp.Role_Id = R.id
    LEFT JOIN Employee AS mgr ON Emp.Manager_id = Mgr.id
    LEFT JOIN Department AS d ON R.Department_id = d.id`, (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu();
    })
};

const mainMenu = () => {
    inq.prompt([{

        type: "list",
        name: "action",
        message: "What Would You Like To Do?",
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View Employees",
            "Exit"

        ]

    }]).then(answers => {
        switch (answers.action) {

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRoles();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case 'View Employees':
                viewEmployees();
                break;

            case 'View Roles':
                viewRoles();
                break;

            case 'View Departments':
                viewDepartments();
                break;

            default:
                console.log("Exiting...");
                connection.end();
                process.exit();
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