const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
});

// Add a new expense
router.post("/", async (req, res) => {
  try {
    const { details, amount } = req.body;
    const newExpense = new Expense({ details, amount });
    await newExpense.save();
    res.json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
});

module.exports = router;
