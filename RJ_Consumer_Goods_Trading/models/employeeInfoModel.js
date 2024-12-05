const db = require('../config/db'); // Database connection

// Get employee by ID
const getEmployeeById = async (employeeId) => {
    try {
        const [rows] = await db.query('SELECT * FROM employee_info WHERE employee_id = ?', [employeeId]);
        return rows[0]; // Return the first result, assuming employee_id is unique
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
};

// Update employee by ID
const updateEmployeeById = async (employeeId, updatedData) => {
    try {
        await db.query(
            'UPDATE employee_info SET first_name = ?, last_name = ?, email = ?, phone_number = ?, address = ?, gender = ? WHERE employee_id = ?',
            [
                updatedData.first_name,
                updatedData.last_name,
                updatedData.email,
                updatedData.phone_number,
                updatedData.address,
                updatedData.gender,
                employeeId,
            ]
        );
    } catch (err) {
        console.error('Error updating employee:', err);
        throw err;
    }
};

// Get all employees
const getAllEmployees = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM employee_info');
        return rows; // Return all employees
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
};

module.exports = {
    getEmployeeById,
    updateEmployeeById,
    getAllEmployees, // Export the function
};
