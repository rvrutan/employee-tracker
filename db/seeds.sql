INSERT INTO department (name)
VALUES ('Engineering'),
       ('HR'),
       ('Sales'),
       ('Marketing'),
       ('Finance'),          
       ('IT Support');       

INSERT INTO role (title, salary, department_id)
VALUES  ('Software Engineer', 80000, 1),
        ('HR Manager', 60000, 2),
        ('Sales Lead', 70000, 3),
        ('Marketing Coordinator', 55000, 4),
        ('Finance Analyst', 75000, 5),         
        ('IT Support Specialist', 50000, 6),   
        ('Senior Software Engineer', 100000, 1),
        ('Sales Executive', 85000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, NULL),
        ('Jane', 'Smith', 2, NULL),
        ('Mike', 'Johnson', 3, 1),
        ('Emma', 'Williams', 4, NULL),
        ('Sarah', 'Brown', 5, NULL),
        ('David', 'Miller', 6, NULL),
        ('Chris', 'Taylor', 7, 1),
        ('Rachel', 'Green', 8, 3),
        ('Daniel', 'White', 1, NULL);