const Task = require('../models/taskModel');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.render('admin/tasks', { tasks });
    } catch (err) {
        res.status(500).send('Error loading tasks.');
    }
};

exports.addTask = async (req, res) => {
    const { employeeId, description } = req.body;
    try {
        await Task.create({ employeeId, description, status: 'pending' });
        res.redirect('/admin/tasks');
    } catch (err) {
        res.status(500).send('Error assigning task.');
    }
};
