const Expense = require("../models/Expense");

// Fetch expenses by date
exports.getExpensesByDate = async (req, res) => {
  const { date } = req.query;

  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const expenses = await Expense.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  const { description, amount, date } = req.body;

  try {
    const expense = new Expense({ description, amount, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
