import React, { useState, useEffect } from "react";
import axios from "axios";

const RoomsHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://seafarerdorm.scarlet2.io/Rooms/fetch_rooms_history.php"
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

    fetchBookings();
  }, []);

  return (
    <div className="p-6 border border-blue-500 rounded-xl bg-white">
      {/* Heading */}
      <h2 className="text-5xl font-outfit mb-4">Rooms History</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="text-left bg-white">
              <th className="p-3 font-outfit font-semibold">Customer’s Name</th>
              <th className="p-3 font-outfit font-semibold">Room</th>
              <th className="p-3 font-outfit font-semibold">Tower</th>
              <th className="p-3 font-outfit font-semibold">Status</th>
              <th className="p-3 font-outfit font-semibold">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="border-b border-blue-300">
                  <td className="p-3 font-outfit font-semibold border-l border-t border-b border-blue-500">{booking.c_name}</td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">{booking.roomId}</td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-blue-500">{booking.tower}</td>
                  <td
                    className={`p-3 font-outfit font-semibold border-t border-b border-blue-500 ${
                      booking.reservation_status === "Paid" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {booking.reservation_status}
                  </td>
                  <td className="p-3 font-outfit font-semibold border-t border-b border-r border-blue-500">
                    {booking.date_timestamp
                      ? new Date(booking.date_timestamp).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsHistory;
