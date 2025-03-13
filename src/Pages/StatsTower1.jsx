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
  const [income, setIncome] = useState(0);
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
    calculateIncome();
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

  const calculateIncome = async () => {
    try {
      const expenseResponse = await axios.get(
        "https://seafarerdorm.scarlet2.io/Expense/fetch_expense_history.php"
      );

      const revenueResponse = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/statistics_datafetch_tower1.php"
      );

      let totalRevenue = 0;
      let totalExpenses = 0;

      // ✅ Filter only Tower 1 Income
      if (revenueResponse.data.success && Array.isArray(revenueResponse.data.data)) {
        const tower1Revenue = revenueResponse.data.data.filter(
          (booking) => booking.tower === "tower-1"
        );

        tower1Revenue.forEach((booking) => {
          totalRevenue += parseFloat(booking.amount) || 0;
        });
      }

      // ✅ Filter only Tower 1 Expenses
      if (expenseResponse.data.length > 0) {
        const tower1Expenses = expenseResponse.data.filter(
          (expense) => expense.tower === "tower-1"
        );

        tower1Expenses.forEach((expense) => {
          totalExpenses += parseFloat(expense.price) || 0;
        });
      }

      setIncome(totalRevenue - totalExpenses);
    } catch (e) {
      console.error("Error calculating income:", e);
      setIncome(0);
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
            booking.tower === "tower-1" &&
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

        <div onClick={handleOpenModal} className="p-3 rounded-lg shadow-md border-2 border-blue-500 bg-white">
          <p className="text-black text-2xl font-semibold">Income</p>
          <div className="flex items-center justify-between">
            <p className="text-6xl mt-5 font-semibold p-2">
            ₱{income.toLocaleString()}
            </p>
            <BiBarChartSquare className="text-[#5C59F5] text-7xl mt-3" />
          </div>
        </div>
      
      {isModalOpen && <AddExpenseModal onClose={handleCloseModal} />}
    </div>

      <div className="bg-white rounded-lg shadow-md border-2 border-blue-500 mt-6 p-6">
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
