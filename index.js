const { showTable, insert, getEmployees, updateEmployeeRole } = require('./db/database');
const inquirer = require('inquirer');

const VIEW_DEPARTMENTS = 'view all departments';
const VIEW_ROLES = 'view all roles';
const VIEW_EMPLOYEES = 'view all employees';
const ADD_DEPARTMENT = 'add a department';
const ADD_ROLE = 'add a role';
const ADD_EMPLOYEE = 'add an employee';
const UPDATE_ROLE = 'update an employee role';

const options = [{
    name: 'action',
    label: 'Select an action',
    type: 'list',
    choices: [
        VIEW_DEPARTMENTS,
        VIEW_ROLES,
        VIEW_EMPLOYEES,
        ADD_DEPARTMENT,
        ADD_ROLE,
        ADD_EMPLOYEE,
        UPDATE_ROLE,
    ]
}];

async function run() {
    const { action } = await inquirer.prompt(options);

    switch (action) {
        case VIEW_DEPARTMENTS:
            await showTable('department');
            break;

        case VIEW_ROLES:
            await showTable('role');
            break;

        case VIEW_EMPLOYEES:
            await showTable('employee');
            break;

        case ADD_DEPARTMENT:
            const { name } = await inquirer.prompt([{ name: 'name', label: 'Department name' }]);
            insert('department', { name })
            break;

        case ADD_ROLE:
            const { title, salary, department_id } = await inquirer.prompt([{
                name: 'title'
            }, {
                name: 'salary'
            }, {
                name: 'department_id'
            }]);

            insert('role', { title, salary, department_id })
            break;

        case ADD_EMPLOYEE:
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([{
                name: 'first_name',
            }, {
                name: 'last_name'
            }, {
                name: 'role_id'
            }, {
                name: 'manager_id'
            }]);

            insert('employee', { first_name, last_name, role_id, manager_id })
            break;

        case UPDATE_ROLE:
            const employees = await getEmployees();

            const { employee } = await inquirer.prompt([{
                name: 'employee',
                label: 'Select employee',
                type: 'list',
                choices: employees.map(employee => `${employee.id} ${employee.first_name} ${employee.last_name}`)
            }]);
            const { role } = await inquirer.prompt([{ name: 'role' }]);

            const employeeId = employee.split(' ')[0];
            await updateEmployeeRole(employeeId, role);
            break;

        default:
            break;
    }

    run();
}

run();