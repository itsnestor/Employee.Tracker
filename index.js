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

// function to Add Role
const addRole = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        let newDepartment = res.map((department) => ({
            name: `${department.name}`,
            value: department.id,
        }));
        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'Please enter your role name.',
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Please enter the salary',
                },
                {
                    name: 'department',
                    type: 'rawlist',
                    message: 'What department is your',
                    choices: newDepartment,
                },
            ])
            .then((answer) => {
                connection.query(
                    'INSERT INTO role SET ?',
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department,
                    },

                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} role inserted!`);

                        start();
                    }
                );
            });
    });
};

// function to Add Department
const addDepartment = () => {
    inquirer
      .prompt([
          {
              name: 'newDepartment',
              type: 'input',
              message: 'Please enter your new department name.',
          },
      ])
      .then((answer) => {
          connection.query(
              'INSERT INTO department SET ?',
              {
                  name: answer.newDepartment,
              },

              (err, res) => {
                  if (err) throw err;
                  console.log(`${res.affectedRows} department inserted!`)

                  start();
              }
          );
      });
};

// function to Update Employee Role
const updateEmployeeRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        let newRole = res.map((role) => ({
            name: role.title,
            value: role.id,
        }));

        connection.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            let newEmployee = res.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));

            inquirer
              .prompt([
                {
                    name: 'employee',
                    type: 'rawlist',
                    message: 'Which employee do you want to update?',
                    choices: newEmployee,
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    choices: newRole,
                },
              ])
              .then((answer) => {
                  connection.query(
                      'UPDATE employee SET ? WHERE ?',
                      [
                          {
                              role_id: answer.role,
                          },
                          {
                              id: answer.employee,
                          },
                      ],
                      (err, res) => {
                          if (err) throw err;
                          console.log(`${res.affectedRows} new role inserted!`);

                          start();
                      }
                  );
              });
        });
    });
};

// function to Update Employee's Manager
const updateEmployeeManager = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        let newManager = res.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id,
        }));

        connection.query('SELECT * FROM employee', (err, res) =>  {
            if (err) throw err;
            let newEmployee = res.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));

            inquirer
              .prompt([
                  {
                      name: 'employee',
                      type: 'rawlist',
                      message: 'Which employee do you want to update?',
                      choices: newEmployee,
                  },
                  {
                      name: 'manager',
                      type: 'rawlist',
                      message: "Who is the employee's new manager?",
                      choices: newManager,
                  },
              ])
              .then((answer) => {
                  connection.query(
                      'UPDATE employee SET ? WHERE ?',
                      [
                          {
                              manager_id: answer.manager,
                          },
                          {
                              id: answer.employee,
                          },
                      ],
                      (err, res) => {
                          if (err) throw err;
                          console.log(`${res.affectedRows} new manager inserted`);

                          start();
                      }
                  );
              });
        });
    });
};
// function to View Employees by Manager
const viewEmployeebyManager = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        let newManager = res.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: `${manager.id}: ${manager.first_name} ${manager.last_name}`
        }));

        inquirer
          .prompt([
              {
                  name: 'manager',
                  type: 'rawlist',
                  message: "What is the employee's manager's name?",
                  choices: newManager,
              },
          ])
          .then((answer) => {
              newManager = answer.manager.split(':');
              connection.query(
                  'SELECT * FROM  employee WHERE ?',
                  {
                      manager_id: newManager[0],
                  },

                  (err, res) => {
                      if (err) throw err;
                      console.table(`${newManager[1]} is the manager of these employees: `, res);

                      start();
                  }
              );
          });
    });
};

// function to Remove Department
const removeDepartment = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        let deleteDepartment = res.map((department) => ({
            name: `${department.name}`,
            value: department.id,
        }));

        inquirer
          .prompt([
              {
                  name: 'department',
                  type: 'rawlist',
                  message: 'Which department would you like to remove?',
                  choices: deleteDepartment,
              },
          ])
          .then((answer) => {
              connection.query(
                  'DELETE FROM department WHERE ?',
                  {
                      id: answer.department,
                  },

                  (err, res) => {
                      if (err) throw err;
                      console.log(`${res.affectedRows} department deleted!`);

                      start();
                  }
              )
          })
    });
}
// function to Remove Role
const removeRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        let deleteRole = res.map((role) => ({
            name: role.title,
            value: role.id,
        }));

        inquirer
          .prompt([
              {
                  name: 'role',
                  type: 'rawlist',
                  message: 'Which role would you like to delete?',
                  choices: deleteRole,
              },
          ])
          .then((answer) => {
              connection.query(
                  'DELETE FROM role WHERE ?',
                  {
                      id: answer.role,
                  },

                  (err, res) => {
                      if (err) throw err;
                      console.log(`${res.affectedRows} role deleted!`);

                      start();
                  }
              );
          });
    });
};
// function to Remove Employee
const removeEmployee = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        let deleteEmployee = res.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
        }));

        inquirer
          .prompt([
              {
                  name: 'employee',
                  type: 'rawlist',
                  message: 'Which employee would you like to delete?',
                  choices: deleteEmployee,
              },
          ])
          .then((answer) => {
              connection.query(
                  'DELETE FROM employee WHERE ?',
                  {
                    id: answer.employee,
                  },

                  (err, res) => {
                      if (err) throw err;
                      console.log(`${res.affectedRows} employee deleted!`);

                      start();
                  }
              );
          });
    });
};
// function to View total budget of Department
const viewBudget = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        let budgetDepartment = res.map((department) => ({
            name: `${department.name}`,
            value: department.id,
        }));

        inquirer
          .prompt([
              {
                  name: 'department',
                  type: 'rawlist',
                  message: "Which department's budget would you like to view?",
                  choices: budgetDepartment,
              },
          ])
          .then((answer) => {
            connection.query(
                'SELECT SUM(salary) AS budget FROM role WHERE ?',
                {
                    department_id: answer.department,
                },

                (err, res) => {
                    if (err) throw err;
                    console.table(res);

                    start();
                }
            );
          });
    });
};