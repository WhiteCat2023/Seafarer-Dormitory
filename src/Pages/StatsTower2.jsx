import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BiGroup, BiBed, BiBarChartSquare } from "react-icons/bi"; // Importing icons

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatsTower2() {
  const [tenants, setTenants] = useState(0);
  const [roomsOccupied, setRoomsOccupied] = useState(0);
  const [revenue, setRevenue] = useState(0); // Added revenue state


  // Bar chart data
  const barData = {
    labels: ["Tenant 1", "Tenant 2", "Tenant 3", "Tenant 4", "Tenant 5"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 3000, 4000, 2000, 7000], // Adjust values
        backgroundColor: "#5C59F5",
        borderRadius: 8,
      },
    ],
  };

  // Bar chart options
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };
  

  useEffect(() => {
    getFromDatabase();
    fetchRoomsData();
  }, []);

  // Fetch tenants and revenue data
  const getFromDatabase = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/book-room.php"
      );
      if (response.data.status === "success") {
        setTenants(response.data.tenants_count);
      }
    } catch (e) {
      console.error("Error fetching tenant data:", e);
    }
  };

  // Fetch rooms data for tower-2
  const fetchRoomsData = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php"
      );
      if (response.data.data) {
        const tower2Rooms = response.data.data.filter(
          (room) => room.tower === "tower-2"
        );
        setRoomsOccupied(tower2Rooms.length);
      }
    } catch (e) {
      console.error("Error fetching rooms data:", e);
    }
  };


  return (
    <div className="p-1 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Number of Tenants */}
        <div className="p-3 rounded-lg shadow-md border-2 border-blue-500 bg-white">
          <p className="text-black text-2xl font-semibold font-outfit">
            Number of Tenants
          </p>
          <div className="flex items-center justify-between">
            <p className="text-9xl font-semibold font-outfit p-2">{tenants}</p>
            <BiGroup className="text-[#5C59F5] text-7xl" />
          </div>
        </div>

        {/* Beds/Rooms Occupied */}
        <div className="p-3 rounded-lg shadow-md border-2 border-blue-500 bg-white">
          <p className="text-black text-2xl font-semibold font-outfit">
            Beds/Rooms Occupied:
          </p>
          <div className="flex items-center justify-between">
            <p className="text-9xl font-semibold font-outfit p-2">
              {roomsOccupied}
            </p>
            <BiBed className="text-[#5C59F5] text-7xl" />
          </div>
        </div>

        {/* Revenue */}
        <div className="p-3 rounded-lg shadow-md border-2 border-blue-500 bg-white">
          <p className="text-black text-2xl font-semibold font-outfit">
            Revenue:
          </p>
          <div className="flex items-center justify-between">
            <p className="text-9xl font-semibold font-outfit p-2">₱{revenue.toLocaleString()}</p>
            <BiBarChartSquare className="text-[#5C59F5] text-7xl" />
          </div>
        </div>
      </div>
       {/* Bar Graph Section */}
       <div className="bg-white rounded-lg shadow-md border-2 border-[#8E86C3] mt-6 p-6">
        <h2 className="text-black text-2xl font-semibold">Revenue Chart</h2>
        <p className="text-gray-600 mb-4">Revenue breakdown for tenants</p>
        <div className="h-80 w-full">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}

export default StatsTower2;
