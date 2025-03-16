"use client"

import { useState, useEffect } from "react"
import { VscSettings } from "react-icons/vsc"
import { IoMdClose } from "react-icons/io"

export default function FilterButton({ onFilterChange, resetFilters }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTower, setSelectedTower] = useState("")
  const [selectedStayType, setSelectedStayType] = useState("")

  // Sample data - replace with your actual tower and stay type options
  const towers = ["tower-1", "tower-2"]
  const stayTypes = ["day", "night", "week", "month"]

  // Effect to reset internal state when resetFilters changes
  useEffect(() => {
    if (resetFilters) {
      setSelectedTower("")
      setSelectedStayType("")
    }
  }, [resetFilters])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const applyFilters = () => {
    // Add a console log to help with debugging
    console.log("Applying filters:", { tower: selectedTower, stayType: selectedStayType })

    onFilterChange({
      tower: selectedTower,
      stayType: selectedStayType,
    })
    setIsOpen(false)
  }

  const clearFilters = () => {
    setSelectedTower("")
    setSelectedStayType("")
    onFilterChange({
      tower: "",
      stayType: "",
    })
  }

  return (
    <div className="relative">
      <button
        className={`h-[30px] py-1 px-2 ${selectedTower || selectedStayType ? "bg-[#b8baef] border-[#595BD4]" : "bg-[#D3D3E7] border-[#6B8DE0]"} rounded-lg border text-sm flex items-center justify-center w-full`}
        onClick={toggleDropdown}
      >
        <span className="inline-flex items-center gap-x-1 font-otomanopee text-[16px] justify-center">
          <VscSettings className={`${selectedTower || selectedStayType ? "text-[#3a3c9e]" : "text-[#595BD4]"}`} />
          Filter
          {(selectedTower || selectedStayType) && (
            <span className="ml-1 bg-[#595BD4] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {(selectedTower ? 1 : 0) + (selectedStayType ? 1 : 0)}
            </span>
          )}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[280px] sm:w-64 bg-white rounded-lg shadow-lg border border-[#6B8DE0] z-50">
          <div className="p-3 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[#595BD4]">Filters</h3>
              <button onClick={toggleDropdown} className="text-gray-500 hover:text-gray-700">
                <IoMdClose />
              </button>
            </div>
          </div>

          <div className="p-3 border-b border-gray-200">
            <h4 className="font-medium mb-2">Tower</h4>
            <div className="space-y-2">
              {towers.map((tower) => (
                <label key={tower} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tower"
                    checked={selectedTower === tower}
                    onChange={() => setSelectedTower(tower)}
                    className="form-radio text-[#595BD4]"
                  />
                  <span>{tower}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 border-b border-gray-200">
            <h4 className="font-medium mb-2">Stay Type</h4>
            <div className="space-y-2">
              {stayTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stayType"
                    checked={selectedStayType === type}
                    onChange={() => setSelectedStayType(type)}
                    className="form-radio text-[#595BD4]"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-3 flex justify-between">
            <button onClick={clearFilters} className="px-3 py-1 text-sm text-[#595BD4] hover:bg-gray-100 rounded">
              Clear All
            </button>
            <button
              onClick={applyFilters}
              className="px-3 py-1 text-sm bg-[#595BD4] text-white rounded hover:bg-[#4a4cb3]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}



