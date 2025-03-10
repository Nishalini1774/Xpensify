import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "./styles.css";

function App() {
  const [expenses, setExpenses] = useState([]); // Stores expenses
  const [salary, setSalary] = useState(10000); // Default salary
  const [remainingBalance, setRemainingBalance] = useState(10000); // Balance

  // ✅ Fetch Salary & Expenses from API
  const fetchFinancialData = useCallback(async () => {
    try {
      const salaryRes = await axios.get("http://localhost:5000/api/salary");
      const expenseRes = await axios.get("http://localhost:5000/api/expenses");

      const fetchedSalary = salaryRes.data?.amount || 10000; // Default if missing
      const fetchedExpenses = expenseRes.data || [];

      setSalary(fetchedSalary);
      setExpenses(fetchedExpenses);
      calculateRemainingBalance(fetchedExpenses, fetchedSalary);
    } catch (error) {
      console.error("❌ Error fetching financial data:", error);
    }
  }, []);

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);

  // ✅ Calculate remaining balance
  const calculateRemainingBalance = (expenses, salary) => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setRemainingBalance(salary - totalExpenses);
  };

  // ✅ Update Salary
  const handleSalaryChange = async (e) => {
    const newSalary = Number(e.target.value);
    setSalary(newSalary);
    calculateRemainingBalance(expenses, newSalary);

    try {
      await axios.post("http://localhost:5000/api/salary", { amount: newSalary });
    } catch (error) {
      console.error("❌ Error updating salary:", error);
    }
  };

  // ✅ Add New Expense
  const handleAddExpense = async (newExpense) => {
    try {
      const response = await axios.post("http://localhost:5000/api/expenses", newExpense);
      if (response.data && response.data.expense) {
        const updatedExpenses = [...expenses, response.data.expense];
        setExpenses(updatedExpenses);
        calculateRemainingBalance(updatedExpenses, salary);
      }
    } catch (error) {
      console.error("❌ Error adding expense:", error);
    }
  };

  // ✅ Delete Expense
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error("❌ Error deleting expense:", error);
    }
  };
  

  // ✅ Format Data for Bar Chart
  const expenseData = expenses.map(exp => ({
    name: exp.details,
    amount: exp.amount,
  }));

  return (
    <div className="app-container">
      <h1>Xpensify - Expense Tracker</h1>
      
  
      {/* Salary Section */}
      <div className="salary-section">
        <label>Salary: </label>
        <input type="number" value={salary} onChange={handleSalaryChange} />
        <h3>Remaining Balance: ₹{remainingBalance}</h3>
      </div>
  
      {/* Main Content - Aligns all sections in a row */}
      <div className="main-content">
        {/* Bar Chart (Left) */}
        <div className="chart-container">
          <h2>Expense Overview</h2>
          {expenseData.length > 0 ? (
            <BarChart width={400} height={250} data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          ) : (
            <p>No expenses yet</p>
          )}
        </div>
  
        {/* Expense List (Center) */}
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
  
        {/* Add Expense (Right) */}
        <AddExpense onAdd={handleAddExpense} />
      </div>
    </div>
  );
}
  

export default App;