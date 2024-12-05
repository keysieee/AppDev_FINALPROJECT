const db = require('../config/db');

// Fetch all tasks, including the employee name
exports.getTasks = async (req, res) => {
  try {
    // Fetch tasks along with the employee name
    const [tasks] = await db.query('SELECT tasks.*, employee.name FROM tasks JOIN employee ON tasks.employee_id = employee.id');
    
    // Fetch all employees (to display in the dropdown)
    const [employee] = await db.query('SELECT * FROM employee');
    
    // Render the tasks view, passing both tasks and employees
    res.render('admin/tasks', { tasks, employees: employee });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Server error");
  }
};

// Add a new task, with employee ID and a 1-week deadline
exports.addTask = async (req, res) => {
  const { description, employee_id } = req.body;
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7); // Set deadline to 1 week from today

  const sql = 'INSERT INTO tasks (task_description, employee_id, task_date, deadline) VALUES (?, ?, ?, ?)';
  try {
    await db.query(sql, [description, employee_id, new Date(), deadline]);
    res.redirect('/tasks');
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).send("Server error");
  }
};

// Update task completion status
exports.toggleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query('SELECT completed FROM tasks WHERE id = ?', [id]);
    const completed = !results[0].completed;
    await db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id]);
    res.redirect('/tasks');
  } catch (err) {
    console.error("Error toggling task:", err);
    res.status(500).send("Server error");
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.redirect('/tasks');
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Server error");
  }
};
