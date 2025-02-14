import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BiBuilding,
  BiSearchAlt,
  BiGroup,
  BiBed,
  BiBarChartSquare,
} from "react-icons/bi";

function DashboardTower1() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [tenants, setTenants] = useState(0);
  const [roomsOccupied, setRoomsOccupied] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getFromDatabase();
    fetchRoomsData();
  }, []);

  const getFromDatabase = async () => {
    try {
      const response = await axios.get(
        "https://seafarerdorm.scarlet2.io/Rooms/book-room.php"
      );
      if (response.data.status === "success") {
        setTenants(response.data.tenants_count || 0);
        setRevenue(response.data.revenue || 0);
      }
    } catch (e) {
      console.error("Error fetching tenant data:", e);
    }
  };

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php?page=${currentPage}&limit=${itemsPerPage}&search=${search}`
      );
      setItems(response.data.data || []);
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
    <div>
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
            Beds/Rooms Occupied
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
            Revenue
          </p>
          <div className="flex items-center justify-between">
            <p className="text-9xl font-semibold font-outfit p-2">
              ₱{revenue.toLocaleString()}
            </p>
            <BiBarChartSquare className="text-[#5C59F5] text-7xl" />
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="flex justify-center items-center my-6">
        <div className="border-2 border-blue-500 rounded-xl p-6 w-full max-w-7xl shadow-lg mb-5">
          <h2 className="text-5xl font-semibold flex font-outfit">
            Rooms Tower 1
          </h2>
          <p className="text-1xl font-semibold flex font-outfit">
            Below are the list of apartments in Tower 1
          </p>

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
                  items
                    .filter((room) => room.tower === "tower-1")
                    .map((room, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-300 bg-white"
                      >
                        <td className="py-2 px-4">{room.roomNumber || "N/A"}</td>
                        <td className="py-2 px-4">{room.name || "N/A"}</td>
                        <td className="py-2 px-4">{room.tower || "N/A"}</td>
                        <td className="py-2 px-4">{room.deck || "N/A"}</td>
                        <td className="py-2 px-4">
                          {room.price ? `₱${room.price}` : "N/A"}
                        </td>
                        <td className="py-2 px-4">{room.pax || "N/A"}</td>
                        <td className="py-2 px-4">{room.baths || "N/A"}</td>
                        <td className="py-2 px-4">{room.amenities || "N/A"}</td>
                      </tr>
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
              disabled={items.length < itemsPerPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTower1;
