import React, { useEffect, useState } from "react";
import axios from "axios";

function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);
  const [revenueTower2, setRevenueTower2] = useState(0);

  // Fetch Expense History
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Expense/fetch_expense_history_2.php"
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch Tower 2 Revenue
  const fetchTower2Revenue = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/statistics_datafetch_tower2.php"
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        let totalRevenue = 0;

        // Add all Tower 2 revenue
        response.data.data.forEach((booking) => {
          totalRevenue += parseFloat(booking.amount) || 0;
        });

        setRevenueTower2(totalRevenue);
      } else {
        setRevenueTower2(0);
      }
    } catch (e) {
      console.error("Error fetching Tower 2 revenue:", e);
      setRevenueTower2(0);
    }
  };

  // Calculate total income per row (Revenue - Expense)
  const calculateIncome = (expensePrice) => {
    return revenueTower2 - parseFloat(expensePrice || 0);
  };

  useEffect(() => {
    fetchExpenses();
    fetchTower2Revenue(); // Fetch revenue for Tower 2 only
  }, []);

  return (
    <div className="p-6 border border-blue-500 rounded-xl bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-5xl font-outfit">Expense History (Tower 2)</h2>
        <button className="text-sm text-gray-500 hover:underline">Clear all history</button>
      </div>

      {/* Expense Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-white">
              <th className="p-3 font-outfit font-semibold">Room Number</th>
              <th className="p-3 font-outfit font-semibold">Tower</th>
              <th className="p-3 font-outfit font-semibold">Expense Type</th>
              <th className="p-3 font-outfit font-semibold">Total Revenue</th>
              <th className="p-3 font-outfit font-semibold">Room Expenses</th>
              <th className="p-3 font-outfit font-semibold">Total Income</th>
              <th className="p-3 font-outfit font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={index} className="border border-blue-300">
                  <td className="p-3 font-outfit font-semibold border-l border-t border-b border-blue-500">{expense.room_id}</td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">{expense.tower}</td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">{expense.name}</td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">₱{revenueTower2.toLocaleString()}</td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">₱{expense.price}</td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">₱{calculateIncome(expense.price)}</td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-r border-blue-500">{expense.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No expense history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseHistory;
