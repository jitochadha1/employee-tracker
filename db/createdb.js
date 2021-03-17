const mysql = require('mysql2');
const dbName = require('./dbname');

const createDB = () => {
    return new Promise(resolve => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root'
        });

        connection.query(`CREATE DATABASE ${dbName}`, function (error, result) {
            if (error && error.errno === 1007) { } // nothing to do here, db already existed!

            const newConnection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                database: dbName,
            });

            resolve(newConnection);
        });

        connection.end();
    });
};


module.exports = createDB;