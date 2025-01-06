import inquirer from "inquirer";
import db from "./db.js";

type Action =
  | "View all departments"
  | "View all roles"
  | "View all employees"
  | "Add a department"
  | "Add a role"
  | "Add an employee"
  | "Update an employee role"
  | "Update an employee manager"
  | "View employees by manager"
  | "View employees by department"
  | "Delete a department"
  | "Delete a role"
  | "Delete an employee"
  | "View department budget"
  | "Exit";

function startApp(): void {
  inquirer
    .prompt<{ action: Action }>({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "View employees by department",
        "View employees by manager",
        "View department budget",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Update an employee manager",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Update an employee manager":
          updateEmployeeManager();
          break;
        case "View employees by manager":
          viewEmployeesByManager();
          break;
        case "View employees by department":
          viewEmployeesByDepartment();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "View department budget":
          viewDepartmentBudget();
          break;
        case "Exit":
          db.end();
          break;
      }
    });
}

function viewDepartments(): void {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) {
      console.error("Error fetching departments:", err);
    } else {
      console.table(res.rows);
    }
    startApp();
  });
}
function viewRoles(): void {
  const query = `
    SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id`;

  db.query(query, (err, res) => {
    if (err) {
      console.error("Error fetching roles:", err);
    } else {
      console.table(res.rows);
    }
    startApp();
  });
}
function viewEmployees(): void {
  const query = `
      SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;

  db.query(query, (err, res) => {
    if (err) {
      console.error("Error fetching employees:", err);
    } else {
      console.table(res.rows);
    }
    startApp();
  });
}
function addDepartment(): void {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the new department:",
      },
    ])
    .then((answers) => {
      const { name } = answers;

      // Insert the new department into the database
      const query = `INSERT INTO department (name) VALUES ($1)`;
      db.query(query, [name], (err) => {
        if (err) {
          console.error("Error adding department:", err);
        } else {
          console.log(`Department "${name}" added successfully!`);
        }
        startApp(); // Return to the main menu
      });
    });
}
function addRole(): void {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    const departmentChoices = res.rows.map(
      (department: { id: number; name: string }) => ({
        name: department.name,
        value: department.id,
      })
    );

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the role title:",
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the role salary:",
        },
        {
          type: "list",
          name: "department_id",
          message: "Choose the department for this role:",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        const { title, salary, department_id } = answers;

        const query = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
        db.query(query, [title, salary, department_id], (err) => {
          if (err) throw err;
          console.log("Role added successfully!");
          startApp();
        });
      });
  });
}
function addEmployee(): void {
  db.query("SELECT * FROM role", (err, rolesRes) => {
    if (err) throw err;

    db.query("SELECT * FROM employee", (err, employeesRes) => {
      if (err) throw err;

      const roleChoices = rolesRes.rows.map(
        (role: { id: number; title: string }) => ({
          name: role.title,
          value: role.id,
        })
      );

      const managerChoices = employeesRes.rows.map(
        (employee: { id: number; first_name: string; last_name: string }) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })
      );

      managerChoices.unshift({ name: "None", value: -1 });

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "Enter the employee's first name:",
          },
          {
            type: "input",
            name: "last_name",
            message: "Enter the employee's last name:",
          },
          {
            type: "list",
            name: "role_id",
            message: "Select the employee's role:",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Select the employee's manager:",
            choices: managerChoices,
          },
        ])
        .then((answers) => {
          const { first_name, last_name, role_id, manager_id } = answers;

          const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
          db.query(
            query,
            [first_name, last_name, role_id, manager_id],
            (err) => {
              if (err) throw err;
              console.log("Employee added successfully!");
              startApp();
            }
          );
        });
    });
  });
}
function updateEmployeeRole(): void {
  db.query("SELECT * FROM employee", (err, employeesRes) => {
    if (err) throw err;

    db.query("SELECT * FROM role", (err, rolesRes) => {
      if (err) throw err;

      const employeeChoices = employeesRes.rows.map(
        (employee: { id: number; first_name: string; last_name: string }) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        })
      );

      const roleChoices = rolesRes.rows.map(
        (role: { id: number; title: string }) => ({
          name: role.title,
          value: role.id,
        })
      );

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_id",
            message: "Select the employee to update:",
            choices: employeeChoices,
          },
          {
            type: "list",
            name: "role_id",
            message: "Select the new role for the employee:",
            choices: roleChoices,
          },
        ])
        .then((answers) => {
          const { employee_id, role_id } = answers;

          const query = `UPDATE employee SET role_id = $1 WHERE id = $2`;
          db.query(query, [role_id, employee_id], (err) => {
            if (err) throw err;
            console.log("Employee role updated successfully!");
            startApp();
          });
        });
    });
  });
}
function updateEmployeeManager(): void {
  db.query("SELECT * FROM employee", (err, employeesRes) => {
    if (err) throw err;

    const employeeChoices = employeesRes.rows.map(
      (employee: { id: number; first_name: string; last_name: string }) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })
    );
    const managerChoices = [...employeeChoices];
    managerChoices.unshift({ name: "None", value: -1 });

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Select the employee to update the manager for:",
          choices: employeeChoices,
        },
        {
          type: "list",
          name: "manager_id",
          message: "Select the new manager:",
          choices: managerChoices,
        },
      ])
      .then((answers) => {
        const { employee_id, manager_id } = answers;

        const query = `UPDATE employee SET manager_id = $1 WHERE id = $2`;
        db.query(
          query,
          [manager_id === -1 ? null : manager_id, employee_id],
          (err) => {
            if (err) throw err;
            console.log("Employee manager updated succesfully!");
            startApp();
          }
        );
      });
  });
}
function viewEmployeesByManager(): void {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id ORDER BY manager`;

  db.query(query, (err, res) => {
    if (err) {
      console.error("Error fetching employees by manager:", err);
    } else {
      console.table(res.rows);
    }
    startApp();
  });
}
function viewEmployeesByDepartment(): void {
  const query = `
    SELECT 
      department.name AS department,
      employee.id, 
      employee.first_name, 
      employee.last_name, 
      role.title
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    ORDER BY department.name`;

  db.query(query, (err, res) => {
    if (err) {
      console.error("Error fetching employees by department:", err);
    } else {
      console.table(res.rows);
    }
    startApp();
  });
}
function deleteDepartment(): void {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;

    const departmentChoices = res.rows.map(
      (department: { id: number; name: string }) => ({
        name: department.name,
        value: department.id,
      })
    );

    inquirer
      .prompt([
        {
          type: "list",
          name: "department_id",
          message: "Select the department to delete:",
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        const { department_id } = answers;

        const query = `DELETE FROM department WHERE id = $1`;
        db.query(query, [department_id], (err) => {
          if (err) throw err;
          console.log("Department deleted successfully!");
          startApp();
        });
      });
  });
}
function deleteRole(): void {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;

    const roleChoices = res.rows.map((role: { id: number; title: string }) => ({
      name: role.title,
      value: role.id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "role_id",
          message: "Select the role to delete:",
          choices: roleChoices,
        },
      ])
      .then((answers) => {
        const { role_id } = answers;

        const query = `DELETE FROM role WHERE id = $1`;
        db.query(query, [role_id], (err) => {
          if (err) throw err;
          console.log("Role deleted successfully!");
          startApp();
        });
      });
  });
}
function deleteEmployee(): void {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;

    const employeeChoices = res.rows.map(
      (employee: { id: number; first_name: string; last_name: string }) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      })
    );

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Select the employee to delete:",
          choices: employeeChoices,
        },
      ])
      .then((answers) => {
        const { employee_id } = answers;

        const query = `DELETE FROM employee WHERE id = $1`;
        db.query(query, [employee_id], (err) => {
          if (err) throw err;
          console.log("Employee deleted successfully!");
          startApp();
        });
      });
  });
}
function viewDepartmentBudget(): void {
  const query = `
    SELECT 
      department.name AS department,
      SUM(role.salary) AS total_budget
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    GROUP BY department.name
  `;

  db.query(query, (err, res) => {
    if (err) {
      console.error("Error fetching department budgets:", err);
    } else {
      console.table(res.rows);
    }
    startApp();
  });
}

startApp();
