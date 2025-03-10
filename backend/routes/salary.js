const express = require("express");
const router = express.Router();
const Salary = require("../models/Salary");

// Get the salary
router.get("/", async (req, res) => {
  try {
    const salary = await Salary.findOne();
    res.json(salary || { amount: 10000 }); // Default salary if not found
  } catch (error) {
    res.status(500).json({ message: "Error fetching salary", error });
  }
});

// Update salary
router.post("/", async (req, res) => {
  try {
    const { amount } = req.body;
    let salary = await Salary.findOne();

    if (salary) {
      salary.amount = amount;
      await salary.save();
    } else {
      salary = new Salary({ amount });
      await salary.save();
    }

    res.json({ message: "Salary updated successfully", salary });
  } catch (error) {
    res.status(500).json({ message: "Error updating salary", error });
  }
});

module.exports = router;
