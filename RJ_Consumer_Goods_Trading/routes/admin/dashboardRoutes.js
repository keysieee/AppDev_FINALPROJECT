const express = require('express');
const router = express.Router();
const dashboardController = require('../../controller/admin/dashboardController');

router.get('/', (req, res) => {
    if (!req.session.loggedin || req.session.role !== 'admin') {
        return res.redirect('/login');
    }
    res.render('admin/dashboard'); // Assuming you have a 'dashboard.ejs' view
});

module.exports = router;