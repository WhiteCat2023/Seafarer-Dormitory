import React, { useState } from "react";
import { FaMoneyBillTransfer, FaUsers, FaCashRegister } from "react-icons/fa6";
import TenantHistory from "./TenantHistory";
import PaymentHistory from "./PaymentHistory";
import ExpenseHistory from "./ExpenseHistory";
import ExpenseHistory2 from "./ExpenseHistory2"; // Import the new component

function History() {
  const [activeTower, setActiveTower] = useState("tower1"); // Default to Tenant History

  return (
    <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
      <div className="lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex">
        <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
          <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">
            History
          </h1>
        </nav>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mt-6 mb-5 border-t-2 pt-4 border-[#595BD4]">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
            activeTower === "tower1" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
          }`}
          onClick={() => setActiveTower("tower1")}
        >
          <FaUsers className="text-xl" />
          Tenant History
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
            activeTower === "tower2" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
          }`}
          onClick={() => setActiveTower("tower2")}
        >
          <FaMoneyBillTransfer className="text-xl" />
          Payment History
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
            activeTower === "tower3" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
          }`}
          onClick={() => setActiveTower("tower3")}
        >
          <FaCashRegister className="text-xl" />
          Expense History (Tower 1)
        </button>

        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-outfit ${
            activeTower === "tower4" ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100 border-[#595BD4]"
          }`}
          onClick={() => setActiveTower("tower4")}
        >
          <FaCashRegister className="text-xl" />
          Expense History (Tower 2)
        </button>
      </div>

      {/* Tab Content */}
      {activeTower === "tower1" && <TenantHistory />}
      {activeTower === "tower2" && <PaymentHistory />}
      {activeTower === "tower3" && <ExpenseHistory />}
      {activeTower === "tower4" && <ExpenseHistory2 />}
    </div>
  );
}

export default History;
