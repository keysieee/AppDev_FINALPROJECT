const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceType: {
    type: String, // 'Return', 'Refund', 'Discount', 'Promotion'
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
