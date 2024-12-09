const express = require('express');
const router = express.Router();
const taskController = require('../controller/tasksController');
const admintaskController = require('../controller/adminController'); // Ensure this points to the correct controller

// Admin routes
router.get('/admin/tasks', taskController.getTasks); // View all tasks
router.post('/admin/tasks/add', taskController.addTask); // Add a new task

// Employee routes
router.get('/employee/tasks', taskController.getTasks); // View own tasks
router.post('/employee/tasks/mark-done', taskController.markTaskDone); // Mark task as done

module.exports = router;
