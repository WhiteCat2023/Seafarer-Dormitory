import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AddExpenseModal = ({ onClose }) => {
  const [tower, setTower] = useState(""); // Tower selection
  const [roomNumber, setRoomNumber] = useState(""); // Selected room number
  const [expenseType, setExpenseType] = useState("");
  const [price, setPrice] = useState("");
  const [rooms, setRooms] = useState([]); // All rooms from API
  const [filteredRooms, setFilteredRooms] = useState([]); // Filtered rooms based on tower
  const MySwal = withReactContent(Swal);

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php"
        );
        if (response.data.data) {
          setRooms(response.data.data); // Store all rooms
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on the selected tower
  useEffect(() => {
    if (tower) {
      setFilteredRooms(rooms.filter((room) => room.tower === tower));
      setRoomNumber(""); // Reset room selection when tower changes
    }
  }, [tower, rooms]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!tower || !roomNumber || !expenseType || !price) {
      MySwal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "All fields are required.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
  
    MySwal.fire({
      icon: "question",
      title: "Confirm Expense",
      text: "Are you sure you want to add this expense?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const expenseData = {
          tower,
          room_id: roomNumber,
          name: expenseType,
          price,
          timestamp: new Date().toISOString(),
        };
  
        try {
          const response = await axios.post(
            "https://seafarerdorm.scarlet2.io/Expense/add_expense.php",
            JSON.stringify(expenseData),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
  
          if (response.data.success) {
            MySwal.fire({
              icon: "success",
              title: "Expense Added",
              text: "The expense has been added successfully.",
            });
            onClose();
          } else {
            MySwal.fire({
              icon: "error",
              title: "Failed to Add Expense",
              text: response.data.message || "Something went wrong.",
            });
          }
        } catch (error) {
          console.error("Error adding expense:", error);
          MySwal.fire({
            icon: "error",
            title: "Server Error",
            text: "Error connecting to the server. Please try again.",
          });
        }
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
        <button onClick={onClose} className="mb-4 flex items-center text-lg">
          <BiArrowBack className="text-2xl mr-2" />
        </button>

        <form onSubmit={handleSubmit}>
          {/* Tower Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tower</label>
            <select
              value={tower}
              onChange={(e) => setTower(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select Tower</option>
              <option value="tower-1">Tower 1</option>
              <option value="tower-2">Tower 2</option>
            </select>
          </div>

          {/* Room Dropdown (Filtered based on Tower) */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Room:</label>
            <select
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-indigo-500"
              disabled={!tower}
            >
              <option value="" disabled>
                {tower ? "Select Room" : "Select a tower first"}
              </option>
              {filteredRooms.map((room) => (
                <option key={room.id} value={room.roomNumber}>
                  {room.roomNumber}
                </option>
              ))}
            </select>
          </div>

          {/* Expense Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Expense:</label>
            <select
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select Expense</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Internet">Internet</option>
            </select>
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price:</label>
            <input
              type="number"
              placeholder="Ex. ₱32131"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-200 border-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
