const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Admin page route
router.get('/', (req, res) => {
    // Check if the user is logged in and is an admin
    if (req.session && req.session.role === 'admin') {
        res.render('admin', {
            role: req.session.role, // Pass the role to the EJS template
        });
    } else {
        res.redirect('/login'); // Redirect to login if not authorized
    }
});

router.get('/', adminController.getAdminPage);

module.exports = router;
