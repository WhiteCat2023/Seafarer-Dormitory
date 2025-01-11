import { useEffect, useRef, useState } from 'react';
import NewApartments from './components/Modals/NewApartments';
import { BiClinic, BiSearchAlt, BiMap } from "react-icons/bi";
import axios from 'axios';
import ContentViewer from './components/ConteNtViewer';

export default function Apartments(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [isItemClicked, setIsItemClicked] = useState(false);
    const [isListVisible, setIsListVisible] = useState(true);
    const apartmentList = useRef(null);
    const [itemKey, setItemKey] = useState('');
    const selectedItem = items.find(item => item.id === itemKey);

    // fetch data async function
    const fetchData = async () => {
        try{
            const response = await axios.get('https://seafarerdorm.scarlet2.io/Apartments/apartments.php');
            setItems(response.data);
        }catch(error){
            console.error(error);

        }
    }

    // useEffect for fetching data
    useEffect(() => { 
        fetchData()
    }, [])

    //function for opening the modal
    const openModal = () => setIsModalOpen(true);

    //function for closing the modal   
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


    return(
        <>
            <div className="container mx-auto mt-10 h-5/6 lg:px-8 ">
                <div className="flex items-center justify-between mb-5 flex-col md:flex-row ">
                    <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
                        <h1 className="md:text-5xl font-outfit font-semibold text-3xl">Apartments</h1>
                        <button onClick={openModal} className="bg-primary px-2 py-2 lg:px-3 lg:py-2 rounded-xl text-white ms-4 hover:bg-transparent hover:border-2 hover:border-blue-500 hover:text-blue-500 border-2 border-transparent flex justify-center text-sm lg:text-base">
                            <i className='lg:text-2xl text-xl me-1 lg:me-2 flex justify-center'>
                                <BiClinic />
                            </i>
                            New Apartment</button>
                    </nav>
                    <div className="relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0">
                        <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search"/>
                        <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
                    </div>
                </div>
                <div className='lg:border-2 lg:h-3/4 h-5/6 lg:rounded-3xl lg:border-blue-500 relative overflow-auto'>
                    <div className='border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white'>
                        <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='loader'></box-icon></i>
                        <div className='flex items-center'>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon type='solid' name='chevron-left'></box-icon></i>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevrons-left' ></box-icon></i>
                            <p className='mx-2'>1</p>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevrons-right' ></box-icon></i>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevron-right' type='solid' ></box-icon></i>
                        </div>
                    </div>
                    <ul className='h-full w-full' id='apartment-li' ref={apartmentList} style={{ display: isListVisible ? 'block': 'none'}}>

                        {/* function responsible for displaying the list ayaw lang sa ni hilabti */}
                        {items.map(item => (
                            <li className='flex justify-between items-center p-4 text-black border-b cursor-pointer' key={item.id} onClick={() => handleItemClick(item.id)}>
                                <span className='flex-grow'>
                                    <p className='font-semibold text-start'>{item.apartment_name}</p>
                                    <span className='flex flex-col ps-2 text-start text-xs'>
                                        <span className='flex items-center text-gray-400'><BiMap className=''/><p>{item.location}</p></span>
                                        <p className='text-gray-400'># of rooms : {item.number_of_rooms}</p>
                                    </span>
                                    
                                </span>
                                {item.isAvailable == 1 ? <p className='text-green-700'>Available</p>: <p className='text-gray-400'>Unavailable</p>}
                            </li>
                        ))}
                    </ul>
                    {isItemClicked && <ContentViewer isOpen={isItemClicked} onClose={handleBackBtnClick} item={selectedItem}/>}
                </div>
            </div>
            {isModalOpen && (<NewApartments isOpen={isModalOpen} onClose={closeModal}/>)}
        </>      
    );
}
