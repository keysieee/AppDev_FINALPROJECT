const employeeModel = require('../models/employeeInfo');

const getEmployeeInfoPage = async (req, res) => {
    if (!req.session.employee) {
        return res.redirect('/login'); // Redirect to login if not logged in
    }

    const employeeId = req.session.employee.employee_id; // Use the employee_id from the session
    try {
        const employee = await employeeModel.getEmployeeById(employeeId); // Fetch specific employee

        if (!employee) {
            return res.status(404).send('Employee not found'); // Handle case when no record is found
        }

        res.render('employeeInfo', { employee }); // Pass only the logged-in employee's data
    } catch (err) {
        console.error('Error retrieving employee information:', err);
        res.status(500).send('Error retrieving employee information');
    }
};

// Render edit page
const getEditEmployeeInfoPage = async (req, res) => {
    if (!req.session.employee) {
        return res.redirect('/login'); // Redirect to login if not logged in
    }

    const employeeId = req.session.employee.employee_id; // Logged-in employee's ID
    try {
        const employee = await employeeModel.getEmployeeById(employeeId);

        if (!employee) {
            return res.status(404).send('Employee not found');
        }

        res.render('editEmployeeInfo', { employee });
    } catch (err) {
        console.error('Error loading edit page:', err);
        res.status(500).send('Error loading edit page');
    }
};

// Update employee information
const updateEmployeeInfo = async (req, res) => {
    const employeeId = req.session.employee.employee_id; // Logged-in employee's ID
    const { first_name, last_name, email, phone_number, address, gender } = req.body;

    try {
        await employeeModel.updateEmployeeById(employeeId, {
            first_name,
            last_name,
            email,
            phone_number,
            address,
            gender,
        });

        res.redirect('/employee-info'); // Redirect to employee info page after updating
    } catch (err) {
        console.error('Error updating employee information:', err);
        res.status(500).send('Error updating employee information');
    }
};

// Get all employees (admin access)
const getAllEmployeesPage = async (req, res) => {
    console.log('Fetching all employees...');
    if (!req.session.admin) {
        return res.redirect('/login');
    }

    try {
        const employees = await employeeModel.getAllEmployees();
        const message = req.query.message || null; // Get message from query params or default to null
        res.render('admin/employeeInfo', { employees, message });
    } catch (err) {
        console.error('Error retrieving employees:', err);
        res.status(500).render('error', { message: 'An error occurred while fetching employees.' });
    }
};

module.exports = {
    getEmployeeInfoPage,
    getEditEmployeeInfoPage,
    updateEmployeeInfo,
    getAllEmployeesPage, // Export the new function
};