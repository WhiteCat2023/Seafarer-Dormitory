import { BiLoader, BiTrash, BiChevronLeft, BiChevronsLeft, BiChevronsRight, BiChevronRight, BiSearchAlt, BiMap, BiHash, BiCheck, BiX, BiInfoCircle } from 'react-icons/bi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import BookingInfo from '../components/Modals/BookingInfo';

function TenantsTower1() {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [key, setKey] = useState(0);
  const selectedItem = items.find(item => item.id === key);
  const [isInfoBtnClicked, setIsInfoBtnClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;

  const fetchData = async () => {
    setLoading(true);
    try{
      const response = await axios.get(`https://seafarerdorm.scarlet2.io/Reservations/retrieve-reservations.php?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`);
        // const apartmentArray = Object.values(response.data);
        setTotalItems(response.data.total); 
        const apartmentArray = Object.values(response.data.data);
        setItems(apartmentArray);
        // setItems(response.data.data);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => { 
    fetchData()
  }, [searchQuery])

  const totalPages = Math.ceil(totalItems / itemsPerPage); 

  const handlePageChange = (newPage) => {
    if(newPage > 0 && newPage <= totalPages){
      setCurrentPage(newPage);
    }
  };

  function openModal(key){
      setIsInfoBtnClicked(true);
      setKey(key);
  }

  function closeModal(){
      setIsInfoBtnClicked(false);
      setKey(0)
  }

  const handleSelectAllChange = (event) => {
      const checked = event.target.checked;
      setSelectAll(checked);
      if (checked) {
          const allIds = new Set(items.map(item => item.id)); 
          setSelectedItems(allIds);
      } else {
          setSelectedItems(new Set()); 
      }
  };

  const handleCheckboxChange = (id) => {
      const newSelectedItems = new Set(selectedItems);
      if (newSelectedItems.has(id)) {
          newSelectedItems.delete(id); 
      } else {
          newSelectedItems.add(id); 
      }
      setSelectedItems(newSelectedItems);
      setSelectAll(newSelectedItems.size === items.length); 
  };

  const handleDeleteSelected = async () => {
      if (selectedItems.size === 0) return; 

      try {
          // Send delete request to the backend for each selected item
          const fd = new FormData();
          fd.append('ids', Array.from(selectedItems).join(','));
          fd.append('tower', "tower-1")
          
          const response = await axios.post('https://seafarerdorm.scarlet2.io/Tenants/delete-tenant-tower-1.php', fd);
          if(response.data.status == 'success'){
              console.log(response.data.status);
          }else{
              console.log(response.data.status);
          }
          
          fetchData();
          setSelectedItems(new Set()); 
          setSelectAll(false); 
      } catch (error) {
          console.error("Error deleting items:", error);
      }
  };

  const handleSearchChange = (event) => {
      setSearchQuery(event.target.value); // Update search query state
  };

  function displayList(){
        if(loading){
        
            return <div className="w-full h-96 flex justify-center items-center">
                <Spinner className="w-10 h-10"/>; 
            </div>
        }
        try{
            return items.length > 0 ? (items.map((item, index) => (
                item.reservationStatus == "accepted" && item.tower == "tower-1" ? (
                    <div className='flex items-center border-b' key={index} id={item.id}>
                    <input type="checkbox" className=' p-2 rounded mx-3 cursor-pointer' checked={selectedItems.has(item.id)} onChange={() => handleCheckboxChange(item.id)} id={item.id} />
                    <li className='flex justify-between items-center p-4 text-black flex-grow'>
                        <span className='flex-grow text-start'>
                            <p className='font-semibold text-gray-800'>{item.cName}</p>
                            <div className='text-xs'>
                                <p className='flex items-center text-gray-400 gap-x-2'><BiMap/>{item.tower}</p>
                                <p className='flex items-center text-gray-400 gap-x-2'><BiHash/>Room no. : {item.roomNumber}</p>
                            </div>
                        </span>
                    </li>
                    <div className='px-4 flex gap-x-2'>
                        <button className='cursor-pointer text-blue-700 p-2 rounded-full text-2xl hover:bg-blue-50' onClick={() => openModal(item.id)}><BiInfoCircle/></button>
                    </div>
                </div>
                ) : <p className='h-96 w-full flex items-center justify-center text-gray-500'>No Tenants Available</p>
            ))) : (
                <p className='h-96 w-full flex items-center justify-center text-gray-500'>No Tenants Available</p>
            )
        }catch(error){
            console.error(error);
            return <p className='h-96 w-full flex items-center justify-center text-gray-500'>Error occurred</p>
        }
    }
  return (
    // Main Section
    <div className="relative">
      <div style={{ display: 'block', height: 'calc(100% - 50px)' }}>
        <div className="border-b-2 border-blue-500 justify-between flex items-center px-4 pb-2 pt-3 sticky top-0 left-0 bg-white">
          {/* Checkbox and Action Icons */}
          <div className="flex items-center gap-x-6">
            <input className="p-2 rounded cursor-pointer" type="checkbox" checked={selectAll} onChange={handleSelectAllChange}/>
            <i onClick={() => fetchData()} className="p-1 text-xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center"><BiLoader /></i>
            <BiTrash onClick={handleDeleteSelected} className="text-3xl p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-96 flex-grow md:flex-grow-0 px-2 lg:px-0">
            <input
              className="rounded-full w-full ps-10 border-blue-500 border-2 p-1"
              type="search"
              placeholder="Search"
              onChange={handleSearchChange}
            />
            <i className="absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center">
              <BiSearchAlt />
            </i>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center">
            <BiChevronLeft onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <BiChevronsLeft onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <p className="mx-2">1</p>
            <BiChevronsRight onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <BiChevronRight onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
          </div>
        </div>
        <div>
          <ul className=' w-full' id='apartment-li'>             
            {displayList()}
          </ul>
        </div>
      </div>
       {isInfoBtnClicked && <BookingInfo isOpen={isInfoBtnClicked} onClose={closeModal} item={selectedItem}/>}      
    </div>
  );
}

export default TenantsTower1;
