// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');

// creating connection to mysql
const connection = mysql.createConnection({
    host: 'localhost',
  
    port: 3306,

    user: 'root',
  
    password: 'Nest0r526!',
    database: 'employeeTracker_db',
});

connection.connect((err) => {
    if (err) throw err;
    start();
});

// start prompting user what they want to do
const start = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'View All Employees by Department':
                viewByDepartment();
                break;
            
            case 'View All Employees by Manager':
                viewByManager();
                break;
        
            case 'Add Employee':
                addEmployee();
                break;

            case 'Remove Employee':
                removeEmployee();
                break;

            case 'Update Employee Role':
                updateRole();
                break;

            case 'Update Employee Manager':
                updateManager();
                break;
        };
    });
};

// function to view all employees
const viewAllEmployees = () => {
    connection.query(('SELECT * FROM employee'), (err, res) => {
        console.log(res);

        start();
    });
};

// function to view by department
const viewByDepartment = () => {
    connection.query(('SELECT * FROM employee WHERE ?'), (err, res) => {
        
    })
}