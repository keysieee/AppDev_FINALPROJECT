const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeInfoController');

router.get('/employee-info', employeeController.getEmployeeInfoPage);
router.get('/employee-info/edit', employeeController.getEditEmployeeInfoPage);
router.post('/employee-info/edit', employeeController.updateEmployeeInfo);
router.get('/admin/employees', employeeController.getAllEmployeesPage);

module.exports = router;    