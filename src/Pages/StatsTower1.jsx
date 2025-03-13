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
import { BiGroup, BiBed, BiBarChartSquare } from "react-icons/bi";
import AddExpenseModal from "../components/Modals/AddExpenseModal"; // Import the modal

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatsTower1() {
  const [tenants, setTenants] = useState(0);
  const [roomsOccupied, setRoomsOccupied] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [chartData, setChartData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    fetchTenantsData();
    fetchRoomsData();
    fetchRevenue();
    fetchChartData();
  }, [month, year]);

  const fetchRoomsData = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php"
      );
      if (response.data.data) {
        const tower1Rooms = response.data.data.filter(
          (room) => room.tower === "tower-1"
        );
        setRoomsOccupied(tower1Rooms.length);
      }
    } catch (e) {
      console.error("Error fetching rooms data:", e);
    }
  };

  const fetchTenantsData = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Reservations/retrieve-reservations.php"
      );
      if (response.data.data) {
        const tower1Tenants = response.data.data.filter(
          (booking) => booking.tower === "tower-1"
        );
        setTenants(tower1Tenants.length);
      } else {
        setTenants(0);
      }
    } catch (e) {
      console.error("Error fetching tenants data:", e);
      setTenants(0);
    }
  };

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

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/statistics_datafetch_tower1.php"
      );

      if (response.data.data) {
        const tower1Bookings = response.data.data.filter((booking) => {
          const bookingDate = new Date(booking.timestamp);
          return (
            bookingDate.getMonth() + 1 === parseInt(month) &&
            bookingDate.getFullYear() === parseInt(year)
          );
        });

        const labels = tower1Bookings.map((booking) => booking.name || "Unknown");
        const data = tower1Bookings.map((booking) =>
          parseFloat(booking.amount) || 0
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Revenue",
              data,
              backgroundColor: "#5C59F5",
              borderColor: "#3b82f6",
              borderWidth: 1,
            },
          ],
        });
      } else {
        setChartData({
          labels: [],
          datasets: [],
        });
      }
    } catch (e) {
      console.error("Error fetching chart data:", e);
      setChartData({
        labels: [],
        datasets: [],
      });
    }
  };

  return (
    <div className="p-1 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-3 rounded-lg shadow-md border-2 border-blue-500 bg-white">
          <p className="text-black text-2xl font-semibold">Number of Tenants</p>
          <div className="flex items-center justify-between">
            <p className="text-9xl font-semibold p-2">{tenants}</p>
            <BiGroup className="text-[#5C59F5] text-7xl" />
          </div>
        </div>

        <div className="p-3 rounded-lg shadow-md border-2 border-blue-500 bg-white">
          <p className="text-black text-2xl font-semibold">Beds/Rooms Occupied</p>
          <div className="flex items-center justify-between">
            <p className="text-9xl font-semibold p-2">{roomsOccupied}</p>
            <BiBed className="text-[#5C59F5] text-7xl" />
          </div>
        </div>

        <div 
        onClick={handleOpenModal} className="p-3 rounded-lg shadow-md border-2 border-blue-500 bg-white">
          <p className="text-black text-2xl font-semibold">Revenue</p>
          <div className="flex items-center justify-between">
            <p className="text-6xl mt-5 font-semibold p-2">
              ₱{revenue.toLocaleString()}
            </p>
            <BiBarChartSquare className="text-[#5C59F5] text-7xl mt-3" />
          </div>
        </div>
      
      {/* Add Expense Modal */}
      {isModalOpen && <AddExpenseModal onClose={handleCloseModal} />}
    </div>

      <div className="bg-white rounded-lg shadow-md border-2 border-blue-500 mt-6 p-6">
        {/* Title and Filters Container */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-black text-2xl font-semibold">Revenue Chart</h2>
            <p className="text-gray-600">Revenue breakdown for tenants</p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex space-x-4">
            <select
              className="border p-2 rounded"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {Array.from({ length: 5 }, (_, i) => {
                const currentYear = new Date().getFullYear();
                return (
                  <option key={i} value={currentYear - i}>
                    {currentYear - i}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="h-80 w-full">
          {chartData && chartData.labels.length > 0 ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
              }}
            />
          ) : (
            <p className="text-center text-gray-500">
              No revenue data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsTower1;
