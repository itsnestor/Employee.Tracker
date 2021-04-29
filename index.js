// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

// creating connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,

    user: 'root',
  
    password: 'Nest0r526!',
    database: 'employeTracker_DB',
  });

  connection.connect((err) => {
    if (err) throw err;
    start();
  });