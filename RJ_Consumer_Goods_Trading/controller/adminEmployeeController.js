const employeeModel = require('../models/adminEmployeeInfoModel');

// Get all employee info for admin
const getAllEmployeeInfoPage = async (req, res) => {
    if (!req.session.admin) {
        return res.redirect('/login'); // Redirect to login if not logged in
    }

    try {
        const employees = await employeeModel.getAllEmployees(); // Fetch all employees
        res.render('employeeInfo', { employees }); // Pass the list of employees
    } catch (err) {
        console.error('Error retrieving employee information:', err);
        res.status(500).send('Error retrieving employee information');
    }
};

module.exports = {
    getAllEmployeeInfoPage,
};