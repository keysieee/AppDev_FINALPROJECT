const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminEmployeeInfoController');

// Admin can view all employee information
router.get('/admin/employeeInfo', adminController.getAllEmployeeInfoPage);

module.exports = router;
