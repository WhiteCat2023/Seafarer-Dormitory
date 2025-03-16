

import TopNavUser from "../components/Nav/TopNavUser"
import Card from "../components/Cards/Card"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Spinner from "../components/Spinner/Spinner"
import Footer from "../components/SubPage/Footer"
import pic1 from "../assets/pic1.png"
import pic2 from "../assets/pic2.png"
import pic3 from "../assets/pic3.png"
import pic4 from "../assets/pic4.png"
import pic5 from "../assets/pic5.png"
import AnimatedCaoursel from "../components/Carousel/AnimatedCarousel"
import { IoSearchSharp } from "react-icons/io5"
import FilterButton from "./filter-button" // Import the new FilterButton component
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi"
import { IoMdClose } from "react-icons/io"

export default function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [isExpand, setIsExpand] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const itemsPerPage = 20
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  // Add new state variables for filters
  const [towerFilter, setTowerFilter] = useState("")
  const [stayTypeFilter, setStayTypeFilter] = useState("")
  // Add a state to trigger filter reset in the FilterButton component
  const [resetFilterTrigger, setResetFilterTrigger] = useState(0)

  const fetchData = async () => {
    setLoading(true)
    try {
      // Log the filter parameters for debugging
      console.log("Fetching with filters:", {
        search: searchQuery,
        tower: towerFilter,
        stayType: stayTypeFilter,
      })

      // Update API call to include tower and stayType filters
      const response = await axios.get(
        `https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php?search=${searchQuery}&tower=${towerFilter}&stayType=${stayTypeFilter}&limit=${itemsPerPage}`,
      )

      // Log the response for debugging
      console.log("API response:", response.data)

      setTotalItems(response.data.total)
      setItems(response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  // Add function to handle filter changes
  const handleFilterChange = (filters) => {
    setTowerFilter(filters.tower)
    setStayTypeFilter(filters.stayType)
    setCurrentPage(1) // Reset to first page when filters change
  }

  // Function to clear all filters and trigger reset in FilterButton
  const clearAllFilters = () => {
    setTowerFilter("")
    setStayTypeFilter("")
    setCurrentPage(1)
    // Increment the reset trigger to cause the useEffect in FilterButton to run
    setResetFilterTrigger((prev) => prev + 1)
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  function handleExpand() {
    setIsExpand((prevState) => !prevState)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value) // Update search query state
  }

  // Update useEffect to include filter dependencies
  useEffect(() => {
    fetchData()
  }, [searchQuery, towerFilter, stayTypeFilter, currentPage])

  function displayList() {
    if (loading) {
      return (
        <div className="w-full h-full flex items-start pt-4 justify-center col-span-full mb-6">
          <div className="my-4 w-full flex justify-center">
            <div className="inline-flex items-center px-4 py-2 bg-[#e0e1ff] text-[#595BD4] rounded-md">
              <Spinner className="mr-2 h-4 w-4" /> Loading results...
            </div>
          </div>
        </div>
      )  
    }

    try {
      if (items.length > 0) {
        return (
          <div className="w-full transition-all duration-300 ease-in-out grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-6">
            {items.map((item) => (
              <Link to="/cv-user" state={item} key={item.id} className="flex justify-center sm:justify-start">
                <div className={`w-full max-w-[250px] ${isExpand ? "row-span-1" : "max-h-[250px]"}`}>
                  <Card item={item} />
                </div>
              </Link>
            ))}
          </div>
        )
      } else {
        // No results found - show a more helpful message
        return (
          <div className="w-full py-12 flex flex-col justify-center items-center">
            <p className="text-gray-500 mb-2 text-center">No rooms match your current filters</p>
            {(towerFilter || stayTypeFilter) && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-1 text-sm bg-[#595BD4] text-white rounded hover:bg-[#4a4cb3] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )
      }
    } catch (error) {
      console.error(error)
      return <p className="w-full py-8 flex items-center justify-center text-gray-500">Error occurred</p>
    }
  }

  const staticImgs = [pic1, pic2, pic3, pic4, pic5]
  return (
    <>
      <div className="w-full mx-auto flex-col flex">
        <main className="px-4 sm:px-6 md:px-8 w-full md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto relative">
          <TopNavUser />
          <div className="px-2 sm:px-4 md:px-6 lg:px-8 mt-4">
            <div className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[320px] mb-4 sm:mb-6 md:mb-8 overflow-hidden rounded-xl">
              <AnimatedCaoursel items={staticImgs} />
            </div>

            {/* Header and Search/Filter Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
              <h2 className="font-otomanopee text-xl sm:text-2xl">Other Rooms Available</h2>
              <div className="flex flex-row w-full sm:w-auto gap-2 sm:gap-4">
                <div className="relative w-full sm:w-[200px] md:w-[250px] lg:w-[300px]">
                  <input
                    className="rounded-xl w-full ps-4 border-[#6B8DE0] border p-1 bg-[#D3D3E7] pe-8"
                    type="search"
                    placeholder="Search"
                    onChange={handleSearchChange}
                  />
                  <IoSearchSharp className="absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-primary" />
                </div>
                <div className="flex-shrink-0">
                  <FilterButton
                    onFilterChange={handleFilterChange}
                    resetFilters={resetFilterTrigger} // Pass the reset trigger
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(towerFilter || stayTypeFilter) && (
              <div className="mt-2 mb-4 flex flex-wrap items-center gap-2 text-sm text-[#595BD4]">
                <span>Filters:</span>
                {towerFilter && (
                  <span className="bg-[#e0e1ff] px-2 py-1 rounded-md flex items-center">
                    Tower: {towerFilter}
                    <button
                      onClick={() => handleFilterChange({ tower: "", stayType: stayTypeFilter })}
                      className="ml-1 text-[#595BD4] hover:text-[#3a3c9e]"
                    >
                      <IoMdClose size={14} />
                    </button>
                  </span>
                )}
                {stayTypeFilter && (
                  <span className="bg-[#e0e1ff] px-2 py-1 rounded-md flex items-center">
                    Stay Type: {stayTypeFilter}
                    <button
                      onClick={() => handleFilterChange({ tower: towerFilter, stayType: "" })}
                      className="ml-1 text-[#595BD4] hover:text-[#3a3c9e]"
                    >
                      <IoMdClose size={14} />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters} // Use the new clearAllFilters function
                  className="text-sm text-[#595BD4] hover:underline"
                >
                  Clear all
                </button>
              </div>
            )}


            {/* Loading Indicator */}
            {/* {loading && (
              <div className="my-4 w-full flex justify-center">
                <div className="inline-flex items-center px-4 py-2 bg-[#e0e1ff] text-[#595BD4] rounded-md">
                  <Spinner className="mr-2 h-4 w-4" /> Loading results...
                </div>
              </div>
            )}

            {/* Filter Summary */}
            {(towerFilter || stayTypeFilter) && !loading && items.length > 0 && (
              <div className="mb-4 p-2 bg-[#f8f8ff] rounded-md">
                <p className="text-sm text-[#595BD4]">
                  Showing {items.length} {items.length === 1 ? "room" : "rooms"}
                  {towerFilter && ` in ${towerFilter}`}
                  {stayTypeFilter && ` of type "${stayTypeFilter}"`}
                </p>
              </div>
            )} 

            {/* Room List */}
            {displayList()}

            {/* Pagination */}
            {items.length > 10 ? (
              <div className="py-6 sm:py-8 md:py-10 w-full flex flex-col justify-center items-center">
                {isExpand ? (
                  <div className="w-full flex justify-center items-center mb-4">
                    <BiChevronsLeft
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-1 text-2xl sm:text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                    <p className="mx-2">{currentPage}</p>
                    <BiChevronsRight
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-1 text-2xl sm:text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    />
                  </div>
                ) : null}
                <p className="text-base sm:text-[17px] font-semibold text-center">
                  {isExpand ? "" : "Continue to explore available rooms"}
                </p>
                <button
                  type="button"
                  className="py-1 px-4 bg-primary rounded-lg text-white text-sm w-28 sm:w-32 mt-2"
                  onClick={handleExpand}
                >
                  {isExpand ? "Show less" : "Show more"}
                </button>
              </div>
            ) : null}
          </div>
          <Footer />
        </main>
      </div>
    </>
  )
}

