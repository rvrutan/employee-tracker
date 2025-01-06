-- Retrieve employee details along with their manager's name, role, salary, and department
SELECT 
    e.id AS employee_id,
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_full_name,
    r.title AS role_title,
    r.salary AS role_salary,
    d.name AS department_name
FROM 
    employee e
-- Join to get manager's information
LEFT JOIN 
    employee m ON e.manager_id = m.id
-- Join to get the role information
INNER JOIN 
    role r ON e.role_id = r.id
-- Join to get the department information
INNER JOIN 
    department d ON r.department_id = d.id
ORDER BY 
    e.id;  -- Optionally, you can order the results by employee ID or another field