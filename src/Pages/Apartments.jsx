import { useEffect, useRef, useState } from 'react';
import NewApartments from './components/Modals/NewApartments';
import { BiClinic, BiSearchAlt, BiMap, BiTrash } from "react-icons/bi";
import axios from 'axios';
import CVApartments from './components/CVApartments';
import Spinner from './components/Spinner';

export default function Apartments(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [isItemClicked, setIsItemClicked] = useState(false);
    const [isListVisible, setIsListVisible] = useState(true);
    const apartmentList = useRef(null); 
    const [loading, setLoading] = useState(false);
    const [itemKey, setItemKey] = useState('');
    const selectedItem = items.find(item => item.id === itemKey);

    const fetchData = async () => {
        setLoading(true);
        try{
            const response = await axios.get('https://seafarerdorm.scarlet2.io/Apartments/apartments.php');
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
        displayList()
    }, [])


    const handleAddApartment = () => {
        fetchData(); // Refresh the list after adding a new apartment
    }

    const openModal = () => setIsModalOpen(true);
   
    const closeModal = () => setIsModalOpen(false);

    const handleItemClick = (key) => {
        setIsItemClicked(true);
        setIsListVisible(false);
        setItemKey(key);
    }

    const handleBackBtnClick = () => {
        setIsItemClicked(false);
        setIsListVisible(true);
    }


    function displayList(){
        if(loading){
            return <Spinner/>; //buhatanan ug centered na spinner
        }
        try{
            return items.length > 0 ? (items.map(item => (
                <div className='flex items-center border-b hover:bg-blue-50'>
                    <input type="checkbox" className='mx-3'/>
                    <li className='flex justify-between items-center p-4 text-black flex-grow cursor-pointer ' key={item.id} onClick={() => handleItemClick(item.id)}>
                        
                        <span className='flex-grow'>
                            <p className='font-semibold text-start text-gray-800'>{item.apartment_name}</p>
                            <span className='flex flex-col ps-2 text-start text-xs'>
                                <span className='flex items-center text-gray-400'><BiMap/><p>{item.location}</p></span>
                                <p className='text-gray-400'># of rooms : {item.number_of_rooms}</p>
                            </span>
                            
                        </span>
                        {item.isAvailable == 'Available' ? <p className='text-green-700'>Available</p>: <p className='text-gray-400'>Unavailable</p>}
                    </li>
                </div>
                
            ))) : (
                <p className='h-full w-full flex items-center justify-center text-gray-500'>No apartments available</p>
            )
        }catch(error){
            console.error(error);
            return <p className='h-full w-full flex items-center justify-center text-gray-500'>Error occurred</p>
        }
    }


    return(
        <>
            <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
                <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row`} style={{display: isListVisible ? 'flex' : 'hidden' }}>
                    <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
                        <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Apartments</h1>
                        <button onClick={openModal} className="bg-primary px-2 py-2 lg:px-3 lg:py-2 rounded-xl text-white ms-4 hover:bg-transparent hover:border-2 hover:border-blue-500 hover:text-blue-500 border-2 border-transparent flex justify-center text-sm lg:text-base" style={{ display: isListVisible ? 'flex': 'none'}}>
                            <i className='lg:text-2xl text-xl me-1 lg:me-2 flex justify-center'>
                                <BiClinic />
                            </i>
                            New Apartment</button>
                    </nav>
                    <div className="relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0" style={{ display: isListVisible ? 'block': 'none'}}>
                        <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search"/>
                        <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
                    </div>
                </div>
                <div className=' relative'>
                    <div style={{ display: isListVisible ? 'block': 'none', height: 'calc(100% - 50px)'}}>
                        <div className='border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white'>
                            <div className='flex items-center gap-x-6'>
                                <input type="checkbox" />
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center' onClick={() => fetchData()}><box-icon name='loader'></box-icon></i>
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
                        <ul className=' w-full' id='apartment-li' ref={apartmentList}>             
                            {displayList()}
                        </ul>
                    </div>
                    {isItemClicked && <CVApartments isOpen={isItemClicked} onClose={handleBackBtnClick} item={selectedItem}/>}
                </div>
            </div>
            {isModalOpen && (<NewApartments isOpen={isModalOpen} onClose={closeModal} onAdd={handleAddApartment}/>)}
        </>      
    );
}
