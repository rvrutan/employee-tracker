## Employee Tracker

## Table of Contents

-[Description](#description) -[Installation](#installation) -[Usage](#usage) -[Contributing](#contributing) -[Test](#test) -[Questions](#questions)

## Description

Employee Tracker is a command-line application that helps businesses manage their employee database using Node.js, Inquirer, and PostgreSQL. The application allows users to view and manage departments, roles, and employees. This Content Management System (CMS) is designed to be user-friendly and provides features to add, update, view, and delete employee-related information.

## Installation

1. Clone the repository: git clone github.com/rvrutan/employee-tracker
2. Navigate to the project directory: cd employee-tracker
3. Install the required dependencies: npm install
4. Install the specific version of Inquirer: npm i inquirer@8.2.4
5. Set up the PostgreSQL database by following these steps:

   • Create a PostgreSQL database.

   • Use the provided schema.sql file to create the necessary tables (department, role, employee).

   • Optionally, use the seeds.sql file to pre-populate the database with sample data.
   

6. Create a .env file in the root of your project to store your PostgreSQL credentials:
   
   DB_USER=yourDatabaseUsername
   
   DB_PASSWORD=yourDatabasePassword
   
   DB_HOST=localhost
   
   DB_PORT=5432
   
   DB_DATABASE=yourDatabaseName

## Usage

1. Start the application by running the following command: npm start
2. You will be presented with a menu of options, allowing you to:
 
   • View all departments
 
   • View all roles
 
   • View all employees
 
   • View employees by manager
 
   • View employees by department
 
   • View total utilized budget of a department
 
   • Add a department, role, or employee
 
   • Update an employee’s role or manager
 
   • Delete a department, role, or employee
3. Select the desired option using your arrow keys and follow the prompts to manage your employee database.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Submit a pull request.

## Questions

Contact me for any further questions;

• Github: [rvrutan] (https://github.com/rvrutan)

• Email: [rutanroni@gmail.com](mailto: rutanroni@gmail.com)
