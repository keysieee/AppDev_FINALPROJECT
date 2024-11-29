const express = require('express');
const router = express.Router();
const inOutController = require('../controller/admin/inOutController');  // Correct path

// Ensure the controller method exists
router.get('/', inOutController.index);  // Correct usage of inOutController.index

module.exports = router;
