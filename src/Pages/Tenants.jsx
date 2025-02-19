import { useState } from "react";
import {
  BiSearchAlt,
  BiTrash,
  BiLoader,
  BiChevronLeft,
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronRight,
  BiBuilding
} from "react-icons/bi";
import TenantsTower1 from "./TenantsTower1";
import TenantsTower2 from "./TenantsTower2";

function Tenants() {
  const [activeTower, setActiveTower] = useState("tower1"); // Set Tower 1 as default

  return (
    <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
      {/* Header Section */}
      <div className="lg:flex items-center justify-between lg:mb-2 flex-col md:flex-row flex">
        <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0 gap-x-4">
          <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Tenants</h1>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
              activeTower === "tower1"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
            }`}
            onClick={() => setActiveTower("tower1")}
          >
            <BiBuilding className="text-xl" />
            Tower 1
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
              activeTower === "tower2"
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
            }`}
            onClick={() => setActiveTower("tower2")}
          >
            <BiBuilding className="text-xl" />
            Tower 2
          </button>
        </nav>
       
      </div>

      {/* Tower Tabs */}
      {/* <div className="flex gap-4 mt-6 mb-5 border-t-2 pt-4 border-[#595BD4]">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
            activeTower === "tower1"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
          }`}
          onClick={() => setActiveTower("tower1")}
        >
          <BiBuilding className="text-xl" />
          Tower 1
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
            activeTower === "tower2"
              ? "bg-blue-500 text-white"
              : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
          }`}
          onClick={() => setActiveTower("tower2")}
        >
          <BiBuilding className="text-xl" />
          Tower 2
        </button>
      </div> */}

      {/* Main Section */}
      <div className="relative">
        <div style={{ display: "block", height: "calc(100% - 50px)" }}>
        

          {/* Tower Content */}
          <ul className="w-full" id="apartment-li">
            {activeTower === "tower1" && <TenantsTower1 />}
            {activeTower === "tower2" && <TenantsTower2 />}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tenants;
