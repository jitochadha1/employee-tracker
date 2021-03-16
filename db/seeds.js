const connection = require('./connect');

connection.query(`
  INSERT INTO department(name)
  VALUES
    ('1'),
    ('2')
`);
connection.query(`
  INSERT INTO department(name)
  VALUES
    ('1'),
    ('2')
`);

/*INSERT INTO role (title, salary, department_id)
VALUES
    (''),
    ('');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    (''),
    ('');*/