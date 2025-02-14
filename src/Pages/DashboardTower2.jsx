import React, { useEffect, useState } from "react";
import axios from "axios";

function DashboardTower2() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php?page=${currentPage}&limit=${itemsPerPage}&search=${search}`
      );
      console.log("API Response:", response.data); // Debugging Line
      setItems(response.data.data || []); // Ensure data exists before setting state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, search]);

  return (
    <div className="flex justify-center items-center my-6">
      <div className="border-2 border-blue-500 rounded-xl p-6 w-full max-w-7xl shadow-lg">
        <h2 className="text-5xl font-semibold flex font-outfit">Rooms Tower 2</h2>
        <p className="text-1xl font-semibold flex font-outfit">Below are the list of apartments in Tower 1</p>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Room Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg mt-3 mb-4"
        />

        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr className="text-left text-gray-700 font-medium bg-gray-200 font-outfit">
                <th className="py-2 px-4">Room Number</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Tower</th>
                <th className="py-2 px-4">Deck</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Pax</th>
                <th className="py-2 px-4">Baths</th>
                <th className="py-2 px-4">Amenities</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((room, index) => (
                    room.tower === "tower-2" ?
                    <tr key={index} className="border-t border-gray-300 bg-white">
                    <td className="py-2 px-4">{room.roomNumber || "N/A"}</td>
                    <td className="py-2 px-4">{room.name || "N/A"}</td>
                    <td className="py-2 px-4">{room.tower || "N/A"}</td>
                    <td className="py-2 px-4">{room.deck || "N/A"}</td>
                    <td className="py-2 px-4">{room.price ? `$${room.price}` : "N/A"}</td>
                    <td className="py-2 px-4">{room.pax || "N/A"}</td>
                    <td className="py-2 px-4">{room.baths || "N/A"}</td>
                    <td className="py-2 px-4">{room.amenities || "N/A"}</td>
                  </tr> : ""
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-red-500">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {currentPage}</span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardTower2;
