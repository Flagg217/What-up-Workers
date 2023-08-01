//initialize npm packages
const inquirer = require('inquirer');
const mysql2 = require('mysql2');

//connect to database
const db = mysql2.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'ecco',
        database: 'employee_db'
    });
