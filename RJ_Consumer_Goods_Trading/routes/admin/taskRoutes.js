const express = require('express');
const router = express.Router();
const tasksController = require('../controller/tasksController');

router.get('/', tasksController.getTasks);
router.post('/add', tasksController.addTask);

module.exports = router;
