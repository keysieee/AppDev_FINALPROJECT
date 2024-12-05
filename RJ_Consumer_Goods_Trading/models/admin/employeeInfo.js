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
    getAllEmployees, // Export the function
};
