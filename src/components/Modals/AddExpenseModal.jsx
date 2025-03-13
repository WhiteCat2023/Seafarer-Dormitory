import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import axios from "axios";

const AddExpenseModal = ({ onClose }) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [price, setPrice] = useState("");
  const [tower, setTower] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!roomNumber || !expenseType || !price || !tower) {
      alert("All fields are required.");
      return;
    }
  
    const expenseData = {
      room_id: roomNumber,
      tower: tower,
      name: expenseType,
      price: price,
      timestamp: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post(
        "https://seafarerdorm.scarlet2.io/Expense/add_expense.php",
        JSON.stringify(expenseData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        alert("Expense added successfully!");
        onClose();
      } else {
        alert(response.data.message || "Failed to add expense.");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Expense</h2>
          <button onClick={onClose}>
            <BiX className="text-2xl text-gray-600 hover:text-red-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Room Number Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number:
            </label>
            <input
              type="text"
              placeholder="Ex. 1"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Expense Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expense:
            </label>
            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            >
              <option value="" disabled>Select Expense</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Internet">Internet</option>
            </select>
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₱):
            </label>
            <input
              type="number"
              placeholder="Ex. 500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Tower Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tower:
            </label>
            <select
              value={tower}
              onChange={(e) => setTower(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
            >
              <option value="" disabled>Select Tower</option>
              <option value="tower-1">Tower 1</option>
              <option value="tower-2">Tower 2</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
