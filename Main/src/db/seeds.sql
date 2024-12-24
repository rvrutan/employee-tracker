INSERT INTO department (deparment_name)
VALUES ('Engineering'),
       ('HR'),
       ('Sales');
      
INSERT INTO roles (title, salary, department_id)
VALUES  ('Sofware Engieer', 80000, 1),
        ('HR Manager', 60000, 2),
        ('Sales Lead', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Jhon', 'Doe', 1, NULL),
        ('Jane', 'Smith', 2, NULL),
        ('Mike', 'Jhonson', 3, 1);
