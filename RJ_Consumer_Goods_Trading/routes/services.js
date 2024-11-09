const express = require('express');
const router = express.Router();
const servicesController = require('../controller/servicesController');

// Routes for Return & Refunds
router.get('/returns', servicesController.getReturns); // Fetch all return & refund records
router.post('/returns', servicesController.addReturn); // Add a new return & refund
router.put('/returns/:id', servicesController.updateReturn); // Update a specific return & refund
router.delete('/returns/:id', servicesController.deleteReturn); // Delete a specific return & refund

// Routes for Discount & Promotions
router.get('/discounts', servicesController.getDiscounts); // Fetch all discount & promotion records
router.post('/discounts', servicesController.addDiscount); // Add a new discount & promotion
router.put('/discounts/:id', servicesController.updateDiscount); // Update a specific discount & promotion
router.delete('/discounts/:id', servicesController.deleteDiscount); // Delete a specific discount & promotion

module.exports = router;
