import { BiClinic, BiSearchAlt, BiTrash, BiMap, BiLoader, BiChevronLeft, BiChevronsLeft, BiChevronsRight, BiChevronRight } from "react-icons/bi";
import AddRoom from "../components/SubPage/AddRoom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import CVRoom from "../components/CV/CVRoom";

//Note: 
    // kulang nalang design sa CVRoom, 
    // AddRoom, ug placements sa list items
    // WORKING PA SA LIST ITEMS SA HOME

// Things to do:
    // 1.  Implement the deletion of items from the backend / (completed)
    // 2.  Implement the pagination functionality / (completed)
    // 3.  Implement the "Select All" checkbox functionality / (completed)
    // 4.  Implement the content viewer functionality and the content editor functionality / (completed)
    // 5.  Implement filter / (pending)

    //By Berndt Dennis F. Canaya

export default function Rooms(){

    const [isBtnClicked, setIsButtonClicked] = useState(false);
    const [isListVisible, setIsListVisible] = useState(true);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 20;
    const [isItemClicked, setItemClicked] = useState(false);
    const [key, setKey] = useState(0);
    const selectedItem = items.find(item => item.id === key);
    const [searchQuery, setSearchQuery] = useState("");

    const openAddRoom = () =>{
        setIsButtonClicked(true);
        setIsListVisible(false);
    }

    const closeAddRoom = () =>{
        setIsButtonClicked(false);
        setIsListVisible(true);
    }

    // STRICTLY DO NOT ERASE KAY BAKA ERASON KA NI LORD
    const fetchData = async () => {
        setLoading(true);
        try{
            // const fd = new FormData();
            // fd.append('page', currentPage);
            // fd.append('limit', itemsPerPage);
            // fd.append('search', searchQuery); 
            // const response = await axios.get('https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php', fd); 
            const response = await axios.get(
                `https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`
              );            setTotalItems(response.data.total); 
            const apartmentArray = Object.values(response.data.data);
            setItems(apartmentArray);
        }catch(error){
            console.error(error);

        }finally{
            setLoading(false);
        }
    }

    useEffect(() => { 
        fetchData()
        console.log(items)
    }, [currentPage, searchQuery]);

    const handlePageChange = (newPage) => {
        if(newPage > 0 && newPage <= totalPages){
            setCurrentPage(newPage);
        }
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

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
            
            const response = await axios.post('https://seafarerdorm.scarlet2.io/Rooms/delete-room.php', fd);
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

    const handleClickItem = (key) => {
        setItemClicked(true);
        setIsListVisible(false);
        setKey(key);
    }

    const closeCV = () =>{
        setItemClicked(false)
        setIsListVisible(true);
        setKey(0);
    }

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
                
                <div className='flex items-center border-b hover:bg-blue-50' key={index}>
                    <input type="checkbox" className=' p-2 rounded mx-3 cursor-pointer' checked={selectedItems.has(item.id)} onChange={() => handleCheckboxChange(item.id)} id={item.id} />
                    <li onClick={() => handleClickItem(item.id)} className='flex justify-between items-center p-4 text-black flex-grow cursor-pointer '>
                        <span className='flex-grow'>
                            <p className='font-semibold text-start text-gray-800'>{item.name}</p>
                            <span className='flex flex-col ps-2 text-start text-xs'>
                                <span className='flex items-center text-gray-400'><BiMap/><p>{item.tower}</p></span>
                                <p className='text-gray-400'># of rooms : {item.roomNumber}</p>
                            </span>
                        </span>
                    </li>
                </div>
            ))) : (
                <p className='h-96 w-full flex items-center justify-center text-gray-500'>No Rooms Available</p>
            )
        }catch(error){
            console.error(error);
            return <p className='h-96 w-full flex items-center justify-center text-gray-500'>Error occurred</p>
        }
    }
    
    return(
        <>
            <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
                <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex`} >
                    <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
                        <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Rooms</h1>
                        <button onClick={openAddRoom}  className={`bg-primary px-2 py-2 lg:px-3 lg:py-2 rounded-xl text-white ms-4 hover:bg-transparent hover:border-2 hover:border-blue-500 hover:text-blue-500 border-2 border-transparent justify-center text-sm lg:text-base ${isListVisible ? 'flex': 'hidden'}`} >
                        <i className='lg:text-2xl text-xl me-1 lg:me-2 flex justify-center'>
                            <BiClinic />
                        </i>
                            New Apartment</button>
                    </nav>
                    <div className={`relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 ${isListVisible ? 'block': 'hidden'}`} >
                        <input onChange={handleSearchChange} className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search" value={searchQuery}/>
                        <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
                    </div>
                </div>
                <div className=' relative'>
                    <div style={{ display: isListVisible ? 'block': 'none', height: 'calc(100% - 50px)'}}>
                        <div className='border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white'>
                            <div className='flex items-center gap-x-6'>
                                <input className=' p-2 rounded cursor-pointer' type="checkbox" onChange={handleSelectAllChange} checked={selectAll}/>
                                <i className='p-1 text-xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center' onClick={() => fetchData()} ><BiLoader/></i>
                                <BiTrash onClick={handleDeleteSelected} className='text-3xl p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                            </div>

                            <div className='flex items-center'>
                                <BiChevronLeft onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                                <BiChevronsLeft onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                                <p className='mx-2'>{currentPage}</p>
                                <BiChevronsRight onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                                <BiChevronRight onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className='p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                            </div>
                        </div>
                        <ul className=' w-full' id='apartment-li'>             
                            {displayList()}
                        </ul>
                    </div>
                    {isItemClicked && <CVRoom isOpen={isItemClicked} onClose={closeCV} item={selectedItem}/>}
                    {isBtnClicked && <AddRoom isOpen={isBtnClicked} onClose={closeAddRoom} onAdd={() => fetchData()}/>}
                </div>
            </div>
        </>
        
    );
}