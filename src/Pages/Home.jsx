import TopNavUser from '../components/Nav/TopNavUser';
import Card from '../components/Cards/Card'
import { useState, useEffect } from "react";
import { BiSearchAlt } from 'react-icons/bi';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import CVUser from '../components/CV/CVUser';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/SubPage/Footer';
import pic1 from '../assets/pic1.png'
import pic2 from '../assets/pic2.png'
import pic3 from '../assets/pic3.png'
import pic4 from '../assets/pic4.png'
import pic5 from '../assets/pic5.png'
import AnimatedCaoursel from '../components/Carousel/AnimatedCarousel'

export default function Home() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isListVisible, setIsListVisible] = useState(true);
  const [key, setKey] = useState(0);
  const selectedItem = items.find(item => item.id == key);

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
              <div className='col-span-1 row-span-1' key={item.id}>
                <Card src={item.files} name={item.name} price={item.price} availability={item.isAvailable} onClick={() => handleItemClick(item.id)}/>
              </div>
            ))) : (
                <p className='h-full w-full flex items-center justify-center text-gray-500'>No apartments available</p>
            )
        }catch(error){
            console.error(error);
            return <p className='h-full w-full flex items-center justify-center text-gray-500'>Error occurred</p>
        }
    }

    const staticImgs = [pic1, pic2, pic3, pic4, pic5]
  return (
    <>
      <div style={{display: isClicked ? 'none': 'block'}}>
        <TopNavUser/>
      </div>
      
      
      <div className={` mx-6 mx-auto flex-col mt-5 `} style={{display: isListVisible ? 'flex': 'none'}}>
        <main className='px-8 w-5/6 mx-auto'>
          <div className='h-[500px] mb-8 overflow-hidden rounded-xl'>
            <AnimatedCaoursel items={staticImgs}/>
          </div>
          <div className="flex justify-between items-center">
            <h2 className='font-bold font-outfit'>Other Rooms Available</h2>
            <div className={`relative w-full md:w-2/6 flex-grow md:flex-grow-0 px-2 lg:px-0 block`}>
              <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search"/>
              <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:auto-rows-[320px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 auto-rows-auto pb-24 pt-4'>
            {displayList()}
          </div>
        </main>
        <Footer/>
        
        
          
      
      </div>
      {isClicked && <CVUser onClick={isClicked} onClose={handleBackBtnClick} item={selectedItem}/>} 
    </>
  )
}

