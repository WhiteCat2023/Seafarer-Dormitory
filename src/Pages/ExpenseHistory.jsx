import React, { useEffect, useState } from "react";
import axios from "axios";

function ExpenseHistory() {
  const [expenses, setExpenses] = useState([]);
  const [revenue, setRevenue] = useState(0);

  // Fetch Expense History
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Expense/fetch_expense_history.php"
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Fetch Tower 1 Total Revenue
  const fetchRevenue = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/statistics_datafetch_tower1.php"
      );
      if (response.data.success && Array.isArray(response.data.data)) {
        const tower1Data = response.data.data.filter(
          (booking) => booking.tower === "tower-1"
        );
        let totalRevenue = 0;

        tower1Data.forEach((booking) => {
          totalRevenue += parseFloat(booking.amount) || 0;
        });

        setRevenue(totalRevenue);
      } else {
        setRevenue(0);
      }
    } catch (e) {
      console.error("Error fetching revenue data:", e);
      setRevenue(0);
    }
  };

  // Calculate total income per row (Revenue - Expense)
  const calculateIncome = (expensePrice) => {
    return revenue - parseFloat(expensePrice || 0);
  };

  useEffect(() => {
    fetchExpenses();
    fetchRevenue(); // Fetch Tower 1 Revenue
  }, []);

  return (
    <div className="p-6 border border-blue-500 rounded-xl bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-5xl font-outfit">Expense History (Tower 1)</h2>
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
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">₱{revenue}</td>
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
