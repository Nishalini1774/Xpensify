const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Salary", SalarySchema);
