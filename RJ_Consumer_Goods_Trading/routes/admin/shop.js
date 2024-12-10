const express = require('express');
const router = express.Router();
const shopController = require('../../controller/admin/shopController');
const uploadMiddleware = require('../../middlewares/uploadMiddleware'); // Ensure this is imported
const adminController = require('../../controller/adminController');

// Render the Shop Page
router.get('/shop', shopController.renderShopPage);

// Add Branch
router.post('/add-branch', shopController.addBranch);

// Update Branch
router.post('/update-branch', shopController.updateBranch);

// Delete Branch
router.delete('/delete-branch/:branch_id', shopController.deleteBranch);

module.exports = router;
