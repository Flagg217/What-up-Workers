INSERT INTO department (dept_name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

  INSERT INTO role (title, salary, department_id)
  VALUES
   ('Sales Lead', 100000.00, 1),
   ('Salesperson', 80000.00, 1),
   ('Lead Engineer', 150000.00, 2),
   ('Software Engineer', 120000.00, 2),
   ('Accountant', 125000.00, 3),
   ('Legal Team Lead', 250000.00, 4),
   ('Lawyer', 190000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Cecil', 'Harvey', 1, NULL),
  ('Ashley', 'Riot', 2, 1),
  ('Cloud', 'Strife', 3, NULL),
  ('Clive', 'Rosfield', 4, 3),
  ('Terra', 'Branford', 5, NULL),
  ('Yuffie', 'Kisaragi', 6, 5),
  ('Noctis', 'Caelum', 7, 5),
  ('Tifa', 'Lockhart', 4, 6);
