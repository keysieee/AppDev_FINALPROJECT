const mongoose = require('mongoose');

const inOutSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timeIn: {
    type: Date,
    required: true,
  },
  timeOut: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const InOut = mongoose.model('InOut', inOutSchema);
module.exports = InOut;
