// dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const consTable = require('console.table');

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
            'View All Roles',
            'View All Departments',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Update Employee Role',
            "Update Employee's Manager",
            'View Employees by Manager',
            'Remove Department',
            'Remove Role',
            'Remove Employee',
            'View total budget of Department'
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'View All Roles':
                viewRoles();
                break;
            
            case 'View All Departments':
                viewDepartments();
                break;
            
            case 'Add Employee':
                addEmployee();
                break;
            
            case 'Add Role':
                addRole();
                break;

            case 'Add Department':
                addDepartment();
                break;

            case 'Update Employee Role':
                updateEmployeeRole();
                break;

            case "Update Employee's Manager":
                updateEmployeeManager();
                break;

            case 'View Employees by Manager':
                viewEmployeebyManager();
                break;

            case 'Remove Department':
                removeDepartment();
                break;
            
            case 'Remove Role':
                removeRole();
                break;
            
            case 'Remove Employee':
                removeEmployee();
                break;

            case 'View total budget of Department':
                viewBudget();
                break;
        };
    });
};

// function to view all employees
const viewAllEmployees = () => {
    connection.query(('SELECT * FROM employee'), (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    });
};

// function to view all roles
const viewRoles = () => {
    connection.query(('SELECT * FROM role'), (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    });
};

// function to view all departments
const viewDepartments = () => {
    connection.query(('SELECT * FROM department'), (err, res) => {
        if (err) throw err;
        console.table(res);

        start();
    });
};

// function to add employee
const addEmployee = () => {
    connection.query(('SELECT * FROM role'), (err, res) => {
        if (err) throw err;
        let newRole = res.map((role) => ({ name: role.title, value: role.id }));

    connection.query(('SELECT * FROM employee'), (err, res) => {
        if (err) throw err;
        let newManager = res.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id
        }));

        inquirer
          .prompt([
              {
                  name: 'firstName',
                  type: 'input',
                  message: "Please enter employee's first name.",
              },
              {
                  name: "lastName",
                  type: 'input',
                  message: "Please enter employee's last name.",
              },
              {
                  name: 'role',
                  type: 'rawlist',
                  message: "What is the employee's role?",
                  choices: newRole,
              },
              {
                  name: 'manager',
                  type: 'rawlist',
                  message: "What is the employee's manager?",
                  choices: newManager,
              },
          ])
          .then((answer) => {
              connection.query(
                  "INSERT INTO employee SET ?",
                  {
                      first_name: answer.firstName,
                      last_name: answer.lastName,
                      manager_id: answer.manager,
                      role_id: answer.role,
                  },

                  (err, res) => {
                      if (err) throw err;
                      console.log(`${res.affectedRows} employee inserted!`);

                      start();
                  }
              );
          });
    });
    });
};

// function to Add Department
// function to Update Employee Role
// function to Update Employee's Manager
// function to View Employees by Manager
// function to Remove Department
// function to Remove Role
// function to Remove Employee
// function to View total budget of Department