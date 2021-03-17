const mysql = require('mysql2');
const dbName = require('./dbname');

// create the connection to database
let connection;

try {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: dbName
    });
} catch (error) {
    console.log(dbName, 'does not exist!');
}

module.exports = connection;