const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
const salaryRoutes = require("./routes/salary");
const expenseRoutes = require("./routes/expenses");

app.use("/api/salary", salaryRoutes);
app.use("/api/expenses", expenseRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
