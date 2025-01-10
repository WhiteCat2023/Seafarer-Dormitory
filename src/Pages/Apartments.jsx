import { useEffect, useState } from 'react';
import NewApartments from './components/Modals/NewApartments';
import { BiClinic, BiSearchAlt, BiMap } from "react-icons/bi";
import axios from 'axios';

export default function Apartments(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    const fetchData = async () => {
        try{
            const response = await axios.get('https://seafarerdorm.scarlet2.io/Apartments/apartments.php');
            setItems(response.data);
        }catch{
            console.error(error);

        }
    }

    useEffect(() => { 
        fetchData()
    }, ['https://seafarerdorm.scarlet2.io/Apartments/apartments.php'])

    // useEffect(() => {
    //     axios.get('https://seafarerdorm.scarlet2.io/Apartments/apartments.php').then(response => {
    //         setItems(response.data);
    //     }).catch(error => {
    //         console.error(error.message);
    //     })
    // }, []);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

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
                    <ul className='h-full w-full bg-red'>
                        {items.map(item => (
                            <li className='flex justify-between items-center p-4 text-black border-b cursor-pointer' key={item.id} onClick={() => setIsClicked(true)}>
                                <span className='flex-grow'>
                                    <p className='font-semibold text-start'>{item.apartment_name}</p>
                                    <span className='flex flex-col ps-2 text-start text-xs'>
                                        <span className='flex items-center text-gray-400'><BiMap className=''/><p>{item.location}</p></span>
                                        <p className='text-gray-400'># of rooms : {item.number_of_rooms}</p>
                                    </span>
                                    
                                </span>
                                {item.isAvailable == 1 ? <p className='text-green-700'>Available</p>: <p className='text-gray-400'>Unavailable</p>}
                                {/* <span className='flex-row-reverse flex'>
                                    {item.isAvailable == 1 ? <p className='text-green-700'>Available</p>: <p className='text-gray-400'>Unavailable</p>}
                                    

                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                        </svg>
                                        <p class="ms-2 text-sm font-bold text-gray-900">4.95</p>
                                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                        <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline">73 reviews</a>
                                    </div>
                                </span> */}
                                

                                {/* <p>{item.description}</p> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {isModalOpen && (<NewApartments isOpen={isModalOpen} onClose={closeModal}/>)}
        </>      
    );
}
