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
    const [departments] = await db.promise().query(`SELECT * FROM department`);
    const departmentChoices = departments.map((department => ({name: department.dept_name, value: department.id})));
    const role =await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of this role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What is the department of this role?',
            choices: departmentChoices,
        },
    ]);
    await db.promise().query(`INSERT INTO role SET ?`, role);
    console.log(`Added ${role.title} to the database`);
    setTimeout(mainQuestion, 3000);
    
}
const addEmployee = async() => {
    const [roles] = await db.promise().query(`SELECT * FROM role`);
    const roleChoices = roles.map((role => ({name: role.title, value: role.id})));
    const [employees] = await db.promise().query(`SELECT * FROM employee`);
    const managerChoices = employees.map((employee => ({name: `${employee.first_name} ${employee.last_name}` , value: employee.id})));
    console.log(roleChoices);
    console.log(managerChoices);
    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the role of the employee?',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the manager of the employee?',
            choices: managerChoices
        },
    ]);
    await db.promise().query(`INSERT INTO employee SET ?`, employee);
    console.log(`Added ${employee.first_name} to the database`);
    setTimeout(mainQuestion, 3000);

}

const updateEmployee = async() => {
    const [employees] = await db.promise().query(`SELECT * FROM employee`);
    const employeeChoices = employees.map((employee => ({name: `${employee.first_name} ${employee.last_name}` , value: employee.id})));
    const [roles] = await db.promise().query(`SELECT * FROM role`);
    const roleChoices = roles.map((role => ({name: role.title, value: role.id})));
    const employee = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: "What is the employee's name?",
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'role_id',
            message: "What is the employee's role?",
            choices: roleChoices
        },
    ]);
    await db.promise().query(`INSERT INTO employee SET role_id=? where id=?`,[ employee.role_id, employee.employee_id]);
    console.log(`Added ${employee.first_name} to the database`);
        }

start();