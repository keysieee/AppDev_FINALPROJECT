const db = require('../db'); // Assuming you have a database connection

// Function to create employee in the employee table
exports.createEmployee = (employee_id, password, role) => {
    return db.query(
        'INSERT INTO employee (employee_id, password, role) VALUES (?, ?, ?)', 
        [employee_id, password, role]
    );
};

// Function to find employee by employee_id
exports.findEmployeeByEmployeeId = (employee_id) => {
    return db.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id]);
};
