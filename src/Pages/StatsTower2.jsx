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
   const [chartData, setChartData] = useState({ labels: [], datasets: [] });


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
    fetchTenantsData();
    fetchRoomsData();
    fetchRevenue();
  }, []);


  const fetchRevenue = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/statistics_datafetch_tower2.php"
      );
  
      console.log("API Response:", response.data);
  
      if (response.data.success && Array.isArray(response.data.data)) {
        // Filter data for only tower-1
        const tower1Data = response.data.data.filter(booking => booking.tower === "tower-2");
  
        const revenueMap = {};
        tower1Data.forEach((booking) => {
          const name = booking.c_name || "Unknown"; 
          const price = parseFloat(booking.total_price) || 0;
          revenueMap[name] = (revenueMap[name] || 0) + price;
        });
  
        const labels = Object.keys(revenueMap);
        const revenueValues = Object.values(revenueMap);
  
        setRevenue(revenueValues.reduce((sum, value) => sum + value, 0));
  
        setChartData({
          labels,
          datasets: [
            {
              label: "Revenue",
              data: revenueValues,
              backgroundColor: "#5C59F5",
              borderRadius: 8,
            },
          ],
        });
      } else {
        console.error("Failed to fetch revenue data:", response.data.message);
        setRevenue(0);
      }
    } catch (e) {
      console.error("Error fetching revenue data:", e);
      setRevenue(0);
    }
  };


  const fetchTenantsData = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Reservations/retrieve-reservations.php"
      );
      
      if (response.data.data) {
        const tower2Tenants = response.data.data.filter(
          (booking) => booking.tower === "tower-2"
        );
        setTenants(tower2Tenants.length);
      } else {
        setTenants(0);
      }
    } catch (e) {
      console.error("Error fetching tenants data:", e);
      setTenants(0);
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
            <p className="text-6xl mt-5 font-semibold font-outfit p-2">₱{revenue.toLocaleString()}</p>
            <BiBarChartSquare className="text-[#5C59F5] text-7xl mt-3" />
          </div>
        </div>
      </div>

       {/* Bar Graph Section */}
             <div className="bg-white rounded-lg shadow-md border-2 border-[#8E86C3] mt-6 p-6">
               <h2 className="text-black text-2xl font-semibold">Revenue Chart</h2>
               <p className="text-gray-600 mb-4">Revenue breakdown for tenants</p>
               <div className="h-80 w-full">
                 {chartData.labels.length > 0 ? (
                   <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
                 ) : (
                   <p className="text-center text-gray-500">No revenue data available</p>
                 )}
               </div>
             </div>
    </div>
  );
}

export default StatsTower2;
