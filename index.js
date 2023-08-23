//initialize npm packages
const inquirer = require('inquirer');
const db = require('./db/connection');

//connect to database
const start = () => {
    console.log('Welcome to the Employee Tracker!');
    mainQuestion();
};

const mainQuestion = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'main',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
        }
    ])
    .then((answer) => {
        switch (answer.main) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployee();
                break;
            case 'Exit':
                db.end();
                break;
        }
    });
}

const viewDepartments = async() => {
    const [departments] = await db.promise().query(`SELECT * FROM department`);
    console.table(departments);
    setTimeout(mainQuestion, 3000);
}

const viewRoles = async() => {
    const [roles] = await db.promise().query(`SELECT * FROM role`);
    console.table(roles);
    setTimeout(mainQuestion, 3000);
}

const viewEmployees = async() => {
    const [employees] = await db.promise().query(`SELECT * FROM employee`);
    console.table(employees);
    setTimeout(mainQuestion, 3000);
}

const addDepartment = async() => {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'dept_name',
            message: 'What is the name of the department?'
        }
    ]);
    await db.promise().query(`INSERT INTO department SET ?`, department);
    console.log(`Added ${department.dept_name} to the database`);
    setTimeout(mainQuestion, 3000);
}

const addRole = async() => {
    const role =await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this role?',
        },
    ]);
    await db.promise().query(`INSERT INTO role SET ?`, role);
    console.log(`Added ${role.title} to the database`);
    setTimeout(mainQuestion, 3000);
}

start();