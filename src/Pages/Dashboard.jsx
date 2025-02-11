import React, { useState } from "react";
import { BiClinic, BiSearchAlt } from "react-icons/bi";
import DashboardTower1 from "./DashboardTower1";
import DashboardTower2 from "./DashboardTower2";

function Dashboard() {
  const [activeTower, setActiveTower] = useState(null);

  return (
    <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
      <div className="lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex">
        <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
          <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">
            Dashboard
          </h1>
        </nav>
        <div className="relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 block">
          <input
            className="rounded-full w-full ps-10 border-blue-500 border-2"
            type="search"
            placeholder="Search"
          />
          <i className="absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center">
            <BiSearchAlt />
          </i>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-6 mb-5 border-t-2 pt-4 border-[#595BD4]">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
            activeTower === "tower1" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
          }`}
          onClick={() => setActiveTower("tower1")}
        >
          <BiClinic className="text-xl" />
          Tower 1
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
            activeTower === "tower2" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
          }`}
          onClick={() => setActiveTower("tower2")}
        >
          <BiClinic className="text-xl" />
          Tower 2
        </button>
      </div>

      {/* Conditionally rendering katong gitudlo ni sir */}
      {activeTower === "tower1" && <DashboardTower1 />}
      {activeTower === "tower2" && <DashboardTower2 />}
    </div>
  );
}

export default Dashboard;
