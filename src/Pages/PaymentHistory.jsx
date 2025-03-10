import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const PaymentHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBookings();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `https://seafarerdorm.scarlet2.io/Rooms/fetch_payment_history.php?search=${searchQuery}`
      );

      if (response.data.success) {
        setBookings(response.data.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const clearHistory = async () => {
    try {
      const response = await axios.post(
        "https://seafarerdorm.scarlet2.io/Rooms/clear_payment_history.php"
      );

      if (response.data.success) {
        setBookings([]);
        Swal.fire({
          icon: "success",
          title: "Payment history cleared successfully!",
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to clear payment history. Try again.",
        });
      }
    } catch (error) {
      console.error("Error clearing tenant history:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to clear payment history. Try again.",
      });
    }
  };

  const confirmClearHistory = () => {
    MySwal.fire({
      icon: "warning",
      title: "Clear All Payment History",
      text: "Are you sure you want to delete all payment records?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        clearHistory();
      }
    });
  };

  return (
    <div className="p-6 border border-blue-500 rounded-xl bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-5xl font-outfit">Payment History</h2>
        <button
          onClick={confirmClearHistory}
          className="text-sm text-gray-500 hover:underline"
        >
          Clear all history
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-white">
              <th className="p-3 font-outfit font-semibold">Customer’s Name</th>
              <th className="p-3 font-outfit font-semibold">Amount</th>
              <th className="p-3 font-outfit font-semibold">Room</th>
              <th className="p-3 font-outfit font-semibold">Date</th>
              <th className="p-3 font-outfit font-semibold">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="border-b border-blue-300">
                  <td className="p-3 font-outfit font-semibold border-l border-t border-b border-blue-500">
                    {booking.name}
                  </td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">
                    ₱{booking.amount.toLocaleString()}
                  </td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">
                    {booking.room_number}
                  </td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">
                    {new Date(booking.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-r border-blue-500">
                    {booking.payment_method}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No Payment Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
