const Employee = require('../models/employee.js'); // Assuming you have a model for employee
const EmployeeInfo = require('../models/employeeInfoModel'); // Assuming you have a model for employee_info
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { 
        employee_id, 
        first_name, 
        last_name, 
        email, 
        phone_number, 
        address, 
        gender, 
        password, 
        role = "employee" // Default role is employee
    } = req.body;

    try {
        // Create the employee entry in the employee table
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving
        const employeeResult = await Employee.createEmployee(employee_id, hashedPassword, role);

        const employeeId = employeeResult.insertId; // Assuming 'insertId' returns the ID of the inserted employee

        // Create the employee info entry in the employee_info table with the newly created employee ID
        await EmployeeInfo.createEmployeeInfo(employeeId, employee_id, first_name, last_name, email, phone_number, address, gender);

        res.redirect('/login');
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send('Error during registration');
    }
};

// controllers/authController.js (or wherever your login logic is)
exports.login = async (req, res) => {
    const { employee_id, password } = req.body;
    try {
        const employee = await Employee.findEmployeeByEmployeeId(employee_id);
        if (employee) {
            const isMatch = await bcrypt.compare(password, employee.password);
            if (isMatch) {
                req.session.employee_id = employee.employee_id;  // Set session variable here
                req.session.employee_name = employee.first_name + ' ' + employee.last_name;  // Optionally, store employee name or other details
                return res.redirect('/employee-info');  // Redirect to employee info page
            } else {
                res.render('login', { error: 'Invalid credentials' });
            }
        } else {
            res.render('login', { error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send('Error during login');
    }
};

