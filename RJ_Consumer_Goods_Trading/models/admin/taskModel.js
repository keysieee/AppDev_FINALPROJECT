const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  assignedBy: {
    type: String, // admin user ID or name
    required: true,
  },
  dateAssigned: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Assigned', // Could be 'Completed', 'Pending', etc.
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
