import { BiClinic, BiSearchAlt, BiTrash, BiMap } from "react-icons/bi";
import AddRoom from "../components/SubPage/AddRoom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";

export default function Rooms(){

    const [isBtnClicked, setIsButtonClicked] = useState(false);
    const [isListVisible, setIsListVisible] = useState(true);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set());

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
            const response = await axios.get('https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php');
            const apartmentArray = Object.values(response.data);
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
    }, []);


    const handleAddRoom = () => {
        fetchData(); 
    }

    // const handleSelectAllChange = () => {
    //     setSelectAll(event.target.checked);
    // }

    const handleSelectAllChange = (event) => {
        const checked = event.target.checked;
        setSelectAll(checked);
        if (checked) {
            const allIds = new Set(items.map(item => item.id)); // Select all item IDs
            setSelectedItems(allIds);
        } else {
            setSelectedItems(new Set()); // Deselect all
        }
    };

    const handleCheckboxChange = (id) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(id)) {
            newSelectedItems.delete(id); // Deselect if already selected
        } else {
            newSelectedItems.add(id); // Select if not selected
        }
        setSelectedItems(newSelectedItems);
        setSelectAll(newSelectedItems.size === items.length); // Update "Select All" checkbox
    };

    const handleDeleteSelected = async () => {
        if (selectedItems.size === 0) return; // Do nothing if no items are selected

        try {
            // Send delete request to the backend for each selected item
            await Promise.all(Array.from(selectedItems).map(id => 
                axios.delete(`https://seafarerdorm.scarlet2.io/Rooms/delete-room.php?id=${id}`)
            ));
            // Refresh the list after deletion
            fetchData();
            setSelectedItems(new Set()); // Clear selected items
            setSelectAll(false); // Reset "Select All" checkbox
        } catch (error) {
            console.error("Error deleting items:", error);
        }
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
                    <input type="checkbox" className='mx-3' checked={selectedItems.has(item.id)} onChange={() => handleCheckboxChange(item.id)} id={item.id} />
                    <li className='flex justify-between items-center p-4 text-black flex-grow cursor-pointer '>
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
                <p className='h-96 w-full flex items-center justify-center text-gray-500'>No rooms available</p>
            )
        }catch(error){
            console.error(error);
            return <p className='h-96 w-full flex items-center justify-center text-gray-500'>Error occurred</p>
        }
    }
    // Deletion of the items is still under construction also the pagination select all and individual selection are done
    // Things to do:
    // 1.  Implement the deletion of items from the backend
    // 2.  Implement the pagination functionality
    // 3.  Implement the "Select All" checkbox functionality
    // 4.  Implement the content viewer functionality and the content editor functionality

    //By Berndt Dennis F. Canaya
    return(
        <>
            <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
                <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex`} >
                    <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
                        <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Rooms</h1>
                        <button onClick={openAddRoom}  className="bg-primary px-2 py-2 lg:px-3 lg:py-2 rounded-xl text-white ms-4 hover:bg-transparent hover:border-2 hover:border-blue-500 hover:text-blue-500 border-2 border-transparent justify-center text-sm lg:text-base flex" >
                        <i className='lg:text-2xl text-xl me-1 lg:me-2 flex justify-center'>
                            <BiClinic />
                        </i>
                            New Apartment</button>
                    </nav>
                    <div className="relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 block" >
                        <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search"/>
                        <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
                    </div>
                </div>
                <div className=' relative'>
                    <div style={{ display: isListVisible ? 'block': 'none', height: 'calc(100% - 50px)'}}>
                        <div className='border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white'>
                            <div className='flex items-center gap-x-6'>
                                <input type="checkbox" onChange={handleSelectAllChange} checked={selectAll}/>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center' onClick={() => fetchData()} ><box-icon name='loader'></box-icon></i>
                                <BiTrash className='text-3xl p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
                            </div>

                            <div className='flex items-center'>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon type='solid' name='chevron-left'></box-icon></i>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevrons-left' ></box-icon></i>
                                <p className='mx-2'>1</p>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevrons-right' ></box-icon></i>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevron-right' type='solid' ></box-icon></i>
                            </div>
                        </div>
                        <ul className=' w-full' id='apartment-li'>             
                            {displayList()}
                        </ul>
                    </div>
                    {isBtnClicked && <AddRoom isOpen={isBtnClicked} onClose={closeAddRoom} onAdd={handleAddRoom}/>}
                </div>
            </div>
        </>
        
    );
}