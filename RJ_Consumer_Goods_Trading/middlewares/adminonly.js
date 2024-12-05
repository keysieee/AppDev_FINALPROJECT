const adminOnly = (req, res, next) => {
    if (req.session.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    next();
};

module.exports.adminOnly = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
        return next();
    }
    res.status(403).send('Access Denied');
};

module.exports = adminOnly;
