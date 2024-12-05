const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeInfoController');

// Define the route for employee info
router.get('/employee-info', employeeController.getEmployeeInfoPage);

// Edit employee information page
router.get('/employee-info/edit', employeeController.getEditEmployeeInfoPage);

// Submit updated employee information
router.post('/employee-info/edit', employeeController.updateEmployeeInfo);

module.exports = router;