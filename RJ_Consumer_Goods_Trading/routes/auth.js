const express = require('express');
const router = express.Router();
const EmployeeController = require('../controller/EmployeeController');

router.post('/signup', EmployeeController.signup); // Ensure this exists

// Signup route
router.get('/signup', (req, res) => {
    res.render('signup');  // Your signup form view
});


// Login route (for completeness)
router.post('/login', EmployeeController.login);  // Handle login POST request

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});



module.exports = router;
