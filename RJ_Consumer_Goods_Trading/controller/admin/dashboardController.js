const taskModel = require('../../models/admin/taskModel');
const Employee = require('../../models/employee');

exports.getDashboard = async (req, res) => {
    try {
        const taskMetrics = {
            total: await Task.count(),
            pending: await Task.count({ where: { status: 'pending' } }),
            completed: await Task.count({ where: { status: 'completed' } })
        };
        const employeeCount = await Employee.count();
        const clockedInCount = await Employee.count({ where: { isClockedIn: true } });

        res.render('admin/dashboard', { taskMetrics, employeeCount, clockedInCount });
    } catch (err) {
        res.status(500).send('Error loading dashboard.');
    }
};
