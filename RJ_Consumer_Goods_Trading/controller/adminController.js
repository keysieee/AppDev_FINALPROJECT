exports.getAdminPage = (req, res) => {
    if (req.session && req.session.role === 'admin') {
        res.render('admin', {
            role: req.session.role, // Pass role to the EJS template
        });
    } else {
        res.redirect('/login'); // Redirect to login if not authorized
    }
};