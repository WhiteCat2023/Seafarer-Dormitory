import TopNavUser from '../components/Nav/TopNavUser';
import Card from '../components/Cards/Card'
import { useState, useEffect } from "react";
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import CVUser from '../components/CV/CVUser';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Home() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isListVisible, setIsListVisible] = useState(true);
  const [key, setKey] = useState(0);
  const selectedItem = items.find(item => item.id == key);
  const navigation = [
    {name: 'Admin', href: '/Login'}
  ]


  const fetchData = async () => {
        setLoading(true);
        try{
            
            const response = await axios.get('https://seafarerdorm.scarlet2.io/Rooms/retrieve-rooms.php');
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

  function handleItemClick(key){
    setIsClicked(true);
    setIsListVisible(false);
    setKey(key)
  }
  function handleBackBtnClick(){
    setIsClicked(false);
    setIsListVisible(true);
  }
  function displayList(){
        if(loading){
            return <Spinner/>; //buhatanan ug centered na spinner
        }
        try{
            return items.length > 0 ? (items.map(item => (
              <div className='col-span-1 row-span-1'>
                <Card src={item.files} key={item.id} name={item.name} price={item.price} availability={item.isAvailable} onClick={() => handleItemClick(item.id)}/>
              </div>
            ))) : (
                <p className='h-full w-full flex items-center justify-center text-gray-500'>No apartments available</p>
            )
        }catch(error){
            console.error(error);
            return <p className='h-full w-full flex items-center justify-center text-gray-500'>Error occurred</p>
        }
    }
  return (
    <>
      <div style={{display: isClicked ? 'none': 'block'}}>
        <TopNavUser navItem={navigation}/>
      </div>
      
      
      <div className={` mx-6 mx-auto flex-col mt-5 lg:mt-24 `} style={{display: isListVisible ? 'flex': 'none'}}>
        <div></div>
        <div className="flex justify-between items-center">
          <h2 className='font-bold font-outfit'>Other Rooms Available</h2>
          <div className={`relative w-full md:w-2/6 flex-grow md:flex-grow-0 px-2 lg:px-0 block`}>
            <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search"/>
            <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
          </div>
        </div>
        <hr className='my-4'></hr>
        <div className='grid grid-cols-1 sm:auto-rows-[320px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 auto-rows-auto px-5 pb-24 pt-4'>
          {displayList()}
        </div>
        
        <footer className='py-4 px-8 border-t-2 border-blue-100'>
          <div className='flex flex-col gap-y-4'>
            <h2>Other information</h2>
            <span className='flex items-center'><FaLocationDot/><p>Juana Osmeña Extension Road, Cebu City, 6000 Cebu , Cebu City, Philippines</p></span>
            <span className='flex items-center'><FaPhoneAlt/><p>0922 489 9721</p></span>
            <span className='flex items-center'><MdEmail/><p>cebuseafarersdormitoryandtrans@gmail.com</p></span>
          </div>
        </footer>
          
      
      </div>
      {isClicked && <CVUser onClick={isClicked} onClose={handleBackBtnClick} item={selectedItem}/>} 
    </>
  )
}

