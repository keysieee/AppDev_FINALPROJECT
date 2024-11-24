const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.employee_id) {
        return next();
    }
    res.redirect('/login'); // Redirect if not authenticated
};