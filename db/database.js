const connection = require('./connect');
const cTable = require('console.table');

const _showTable = async (query) => {
    const results = await makeQuery(query);
    console.table(results);
};

const makeQuery = (query) => {
    return new Promise(resolve => {
        connection.query(query, function (err, results, fields) {
            resolve(results);
        });
    });
};

const showTable = async (table) => {
    let query = `SELECT * from ${table}`;

    if (table === 'employee') {
        const allEmployees = await getEmployees();

        query = `
            SELECT
                employee.id, employee.first_name, employee.last_name,
                role.title,
                department.name AS 'department',
                role.salary,
                employee.manager_id
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON department.id = role.department_id`;

        const results = await makeQuery(query);

        const employees = results.map(employee => {
            const manager = allEmployees.find(({ id }) => id === employee.manager_id);
            employee.manager = manager ? `${manager.first_name} ${manager.last_name}` : '-';
            delete employee.manager_id;

            return employee;
        });

        console.table(employees);

        return;
    }

    if (table === 'role') {
        query = `
            SELECT
                role.id, role.title, role.salary, department.name AS 'department name'
            from role
            LEFT JOIN department
            ON role.department_id = department.id`;
    }

    return _showTable(query);
};

const insert = (table, data) => {
    return new Promise(resolve => {
        // Get columns
        const columns = Object.keys(data).join(', ');

        // Add quotes to values
        const values = Object.values(data).map(val => `'${val}'`).join(', ');

        const query = `
            INSERT INTO ${table} (${columns})
            VALUES (${values})
        `;

        connection.query(query, resolve);
    });
}

const deleteEmployee = (id) => {
    const query = `
        DELETE FROM employee
        where id = '${id}'
    `;

    return makeQuery(query);
}

const getEmployees = () => {
    const query = 'SELECT * from employee';

    return new Promise(resolve =>
        connection.query(query, (err, employees) => resolve(employees))
    );
};

const updateEmployeeRole = (employeeId, newRole) => {
    const query = `UPDATE employee SET role_id='${newRole}' WHERE id=${employeeId}`;
    console.log(query);
    return new Promise(resolve =>
        connection.query(query, resolve)
    );
};

// const showEmployees = () => {
//     return new Promise(resolve => {
//         connection.query(`SELECT employee.id, employee.first_name, employee.last_name
//                         FROM employee
//                         INNER JOIN role ON employee.role_id=role.id`,
//             function (err, results, fields) {
//                 console.table(results);
//                 resolve();
//             });
//     });
// }

module.exports = { showTable, insert, getEmployees, updateEmployeeRole, deleteEmployee };