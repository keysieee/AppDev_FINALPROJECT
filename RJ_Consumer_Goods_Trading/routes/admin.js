const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/dashboard', adminController.dashboard);
router.get('/tasks', adminController.tasks);
router.get('/inout', adminController.inout);
router.get('/services', adminController.services);
router.get('/inventory', adminController.inventory);
router.get('/shop', adminController.shop);

// New route for employee-info
router.get('/employee-info', adminController.employeeInfo);

// Get total employees
router.get('/total-employees', adminController.getTotalEmployees);

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Test route is working' });
});

module.exports = router;
