import { BiCheck, BiHash, BiInfoCircle, BiMap, BiSearchAlt, BiTrash, BiX } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@material-tailwind/react';
import BookingInfo from '../components/Modals/BookingInfo';

//Note:
    // Ang pagtarung nalang sa design igkahuman sa things to do
    //Wala nay CV sa Reservations kay gamay ra kaayu details ibutang need modal

// Things to do:
    // 1.  Implement the deletion of items from the backend / (complete)
    // 2.  Implement the pagination functionality / (pending)
    // 3.  Implement the "Select All" checkbox functionality / (complete)
    // 4.  Implement the content viewer functionality and the content editor functionality / (NA)
    // 5.  Implement filter / (pending)
    // 6.  Implement accept/delete reservation request backend / (pending)

    //By Berndt Dennis F. Canaya

export default function Reservations() {


    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [isListVisible, setIsListVisible] = useState(true);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [key, setKey] = useState(0);
    const selectedItem = items.find(item => item.id === key);
    const [isInfoBtnClicked, setIsInfoBtnClicked] = useState(false);

    //Need pa ni e-modify paras pagination STRICTLY DO NOT TOUCH
    const fetchData = async () => {
        setLoading(true);
        try{
            
            const response = await axios.get('https://seafarerdorm.scarlet2.io/Reservations/retrieve-reservations.php');
            // const apartmentArray = Object.values(response.data);
            setItems(response.data.data);
        }catch(error){
            console.error(error);

        }finally{
            setLoading(false);
        }
    }

    useEffect(() => { 
        fetchData()
    }, [])

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
            
            const response = await axios.post('https://seafarerdorm.scarlet2.io/Reservations/delete-reservation.php', fd);
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

    function displayList(){
        if(loading){
        
            return <div className="w-full h-96 flex justify-center items-center">
                <Spinner className="w-10 h-10"/>; 
            </div>
        }
        try{
            return items.length > 0 ? (items.map((item, index) => (
                <div className='flex items-center border-b' key={index}>
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
                        <button className='cursor-pointer text-green-700 p-2 rounded-full text-2xl hover:bg-green-50'><BiCheck/></button>
                        <button className='cursor-pointer text-red-700 p-2 rounded-full text-2xl hover:bg-red-50'><BiX/></button>
                        <button className='cursor-pointer text-blue-700 p-2 rounded-full text-2xl hover:bg-blue-50' onClick={() => openModal(item.id)}><BiInfoCircle/></button>
                    </div>
                </div>
            ))) : (
                <p className='h-96 w-full flex items-center justify-center text-gray-500'>No Reservations Available</p>
            )
        }catch(error){
            console.error(error);
            return <p className='h-96 w-full flex items-center justify-center text-gray-500'>Error occurred</p>
        }
    }

    return (
        <>
            <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
                <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex`} >
                    <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
                        <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Reservations</h1>
                        {/* <button  className="bg-primary px-2 py-2 lg:px-3 lg:py-2 rounded-xl text-white ms-4 hover:bg-transparent hover:border-2 hover:border-blue-500 hover:text-blue-500 border-2 border-transparent flex justify-center text-sm lg:text-base" >
                            <i className='lg:text-2xl text-xl me-1 lg:me-2 flex justify-center'>
                                <BiClinic />
                            </i>
                            New User</button> */}
                    </nav>
                    <div className={`relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 block`}>
                        <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search"/>
                        <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
                    </div>
                </div>
                <div className=' relative'>
                    <div style={{ display: 'block', height: 'calc(100% - 50px)'}}>
                        <div className='border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white'>
                            <div className='flex items-center gap-x-6'>
                                <input type="checkbox" onChange={handleSelectAllChange} checked={selectAll} className=' p-2 rounded cursor-pointer'/>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center' onClick={() => fetchData()} ><box-icon name='loader'></box-icon></i>
                                <BiTrash onClick={handleDeleteSelected} className='text-3xl p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'/>
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
                </div>  
                {isInfoBtnClicked && <BookingInfo isOpen={isInfoBtnClicked} onClose={closeModal} item={selectedItem}/>}      
            </div>
        </>
    )
}