import React from "react";

function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.details} - ₹{expense.amount}
            <button onClick={() => onDelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
