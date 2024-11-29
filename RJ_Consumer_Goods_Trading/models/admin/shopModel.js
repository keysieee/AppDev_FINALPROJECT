const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  branchName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee', // assuming an Employee model exists
  }],
});

const Shop = mongoose.model('Shop', shopSchema);
module.exports = Shop;
