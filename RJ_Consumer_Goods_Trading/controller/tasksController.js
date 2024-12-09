const db = require('../config/db'); // Assuming db is configured
const moment = require('moment');

// Fetch tasks for admin and employees
exports.getTasks = async (req, res) => {
  try {
      const userRole = req.session.role; // Check user role
      const userId = req.session.userId; // Get the logged-in user's ID

      let tasks = [];
      if (userRole === 'admin') {
          // Admin fetches all tasks
          const [result] = await db.query('SELECT * FROM tasks ORDER BY task_date DESC');
          tasks = result || []; // Ensure tasks is always an array, even if empty
      } else if (userRole === 'employee') {
          // Employee fetches only their own tasks
          const [result] = await db.query('SELECT * FROM tasks WHERE employee_id = ? ORDER BY task_date DESC', [userId]);
          tasks = result || []; // Ensure tasks is always an array, even if empty
      }

      // Render the appropriate view based on the role
      res.render(userRole === 'admin' ? 'admin/tasks' : 'employee/tasks', { tasks });
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

// Add a new task (Admin only)
exports.addTask = async (req, res) => {
    const { employee_id, task_description, task_date } = req.body;

    try {
        await db.query(
            'INSERT INTO tasks (employee_id, task_description, task_date) VALUES (?, ?, ?)',
            [employee_id, task_description, task_date]
        );
        res.redirect('/admin/tasks');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Mark task as done (Employee only)
exports.markTaskDone = async (req, res) => {
    const { taskId } = req.body;

    try {
        await db.query('UPDATE tasks SET is_done = ? WHERE id = ?', [true, taskId]);
        res.redirect('/employee/tasks');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
