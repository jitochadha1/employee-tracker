const connection = require('./connect');

connection.query(`
  INSERT INTO department(name)
  VALUES
    ('Development'),
    ('Marketing'),
    ('Sales'),
    ('Operations'),
    ('Legal')
`);

connection.query(`
  INSERT INTO role(title, salary, department_id)
  VALUES
    ('Manager', '130000', '4'),
    ('Engineer', '120000', '1'),
    ('Salesperson', '100000', '3'),
    ('Lawyer', '90000', '5'),
    ('Marketing Lead', '130000', '2'),
    ('Lead Engineer', '130000', '1'),
    ('Accountant', '85000', '4'),
    ('Graphic Designer', '75000', '2')
`);

connection.query(`
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Sally', 'Mae', 2, 1),
    ('Lisa', 'Page', 3, 1),
    ('Jim', 'Right', 4, 1),
    ('John', 'Doe', 1, 2),
    ('Terry', 'Lynn', 1, 1),
    ('Doug', 'Brown', 2, 2),
    ('Matt', 'Bridges', 4,2 )
`);

connection.query(`
INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Fawn', 'Bailey', 3),
    ('Steve', 'Lamey', 1),
    ('Tony', 'Dugal', 2)
`);

connection.end();