const express = require('express');
const router = express.Router();
const shopController = require('../../controller/admin/shopController');
const uploadMiddleware = require('../../middlewares/uploadMiddleware'); // Ensure this is imported

// Render the Shop Page
router.get('/shop', shopController.renderShopPage);

// Use the upload middleware for file uploads
router.post('/add-branch', uploadMiddleware, shopController.addBranch); // Ensure this is correct

module.exports = router;