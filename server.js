 const mysql = require("mysql");
 const inq = require("inquirer");
 const fs = require("fs");


 const connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     user: "root",
     password: "rootroot",
     database: "Otto"
 });

 connection.connect(function(err) {
     if (err) throw err;
     Start();

 });

 function start() {

     inquirer.prompt({

     })
 }

 function AddEmployee() {
     console.log("Adding Employee... \n");
     let query = connection.query(
         "Add Employee to Employee Table?", {
             First_name: "",
             Last_name: "",
             Role_id: "",
             Manager_id: ""

         },
         (err, res) => {
             if (err) throw err;
             console.log(res.affectedRows + "product inserted!\n");
             updateEmployee();
         }
     )
 }

 function updateEmployee() {
     console.log("Updating Employee Table...\n");
     let query = connection.query(
         "Upadte Employee Table?", [
             {}
         ]
     )
 }