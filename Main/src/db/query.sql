SELECT department.name, SUM(roles.salary) AS total_budget
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id
GROUP BY department.deparment_name;