const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Middleware to check if the user is logged in and is an admin
function isAdmin(req, res, next) {
    if (req.session && req.session.role === 'admin') {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.redirect('/login'); // Redirect to login if not authorized
    }
}

// Admin page route using middleware
router.get('/', isAdmin, adminController.getAdminPage);

module.exports = router;