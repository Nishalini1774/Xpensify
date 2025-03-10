import React, { useState } from "react";

function AddExpense({ onAdd }) {
  const [details, setDetails] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!details || !amount || !date) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense = { details, amount: Number(amount), date };
    onAdd(newExpense); // Ensure this is called properly

    // Clear input fields
    setDetails("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="add-expense-section">
      <h3>Add Expense</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Expense Details" value={details} onChange={(e) => setDetails(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
