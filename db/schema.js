const createDB = require('./createDB');

(async function () {
  const connection = await createDB();

  connection.query('DROP TABLE IF EXISTS department');
  connection.query('DROP TABLE IF EXISTS role');
  connection.query('DROP TABLE IF EXISTS employee');

  connection.query(`CREATE TABLE department(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
  )`);
  connection.query(`CREATE TABLE role(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER UNSIGNED
  )`);
  connection.query(`CREATE TABLE employee(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER UNSIGNED
  )`);

  connection.end();
})();