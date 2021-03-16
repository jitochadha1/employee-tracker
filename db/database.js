const connection = require('./connect');
const cTable = require('console.table');

const showTable = (table) => {
    return new Promise(resolve => {
        connection.query(`SELECT * from ${table}`, function (err, results, fields) {
            console.table(results);
            resolve();
        });
    });
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

const getEmployees = () => {
    const query = 'SELECT * from employee';

    return new Promise(resolve =>
        connection.query(query, (err, employees) => resolve(employees))
    );
};

const updateEmployeeRole = (employeeId, newRole) => {
    const query = `UPDATE employee SET role_id='${newRole}' WHERE id='${employeeId}'`;

    return new Promise(resolve =>
        connection.query(query, resolve)
    );
};

module.exports = { showTable, insert, getEmployees, updateEmployeeRole };