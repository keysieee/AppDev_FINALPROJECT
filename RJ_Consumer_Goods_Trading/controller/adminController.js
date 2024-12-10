const db = require('../config/db');

exports.dashboard = (req, res) => {
    res.render('admin/dashboard', { title: 'Dashboard' });
};

exports.tasks = (req, res) => {
    res.render('admin/tasks', { title: 'Tasks' });
};

exports.inout = (req, res) => {
    res.render('admin/inout', { title: 'In/Out' });
};

exports.services = (req, res) => {
    res.render('admin/services', { title: 'Services' });
};

exports.inventory = (req, res) => {
    res.render('admin/inventory', { title: 'Inventory' });
};

exports.shop = (req, res) => {
    res.render('admin/shop', { title: 'Shop' });
};

exports.employeeInfo = (req, res) => {
    res.render('admin/employeeInfo', { title: 'Employee Information' });
};


exports.getTotalEmployees = async (req, res) => {
    try {
        console.log('Fetching total employees from the database...');
        const [rows] = await db.query('SELECT COUNT(*) as totalEmployees FROM employee');
        console.log('Query result:', rows);
        const totalEmployees = rows[0].totalEmployees;
        res.json({ totalEmployees });
    } catch (error) {
        console.error('Error fetching total employees:', error);
        res.status(500).json({ error: 'Failed to fetch total employees' });
    }
};

exports.shop = async (req, res) => {
    try {
        // Fetch branches from the database
        const [branches] = await db.query('SELECT * FROM branches');

        // Render the view with branches
        res.render('admin/shop', { branches });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
};
