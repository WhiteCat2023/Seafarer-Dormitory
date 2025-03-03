import TopNavUser from '../components/Nav/TopNavUser';
import Card from '../components/Cards/Card'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import Footer from '../components/SubPage/Footer';
import pic1 from '../assets/pic1.png'
import pic2 from '../assets/pic2.png'
import pic3 from '../assets/pic3.png'
import pic4 from '../assets/pic4.png'
import pic5 from '../assets/pic5.png'
import AnimatedCaoursel from '../components/Carousel/AnimatedCarousel'
import { IoSearchCircleOutline, IoSearchOutline, IoSearchSharp } from 'react-icons/io5';
import { VscSettings } from 'react-icons/vsc';

export default function Home() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpand, setIsExpand] = useState(false)

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

  function handleExpand(){
    // setIsExpand(true)
    setIsExpand(prevState => !prevState);
  }


  useEffect(() => { 
    fetchData()
  }, [])
  function displayList(){
    console.log(items)
        if(loading){
            return <div className='w-full h-full flex items-start pt-4 justify-center col-span-6'><Spinner/></div>; //buhatanan ug centered na spinner
        }
        try{
            return items.length > 0 ? (items.map(item => (
              <Link to="/cv-user" state={item} key={item.id}>
                <div className={`max-w-[250px]  w-full h-full  ${isExpand ? "row-span-1" :  "max-h-[250px]" }`} >
                  <Card item={item}/>
                </div>
              </Link>
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
      <div className={` mx-6 mx-auto flex-col flex`}>
        <main className='px-8 w-[80%] mx-auto relative'>
          <TopNavUser/>
          <div className='px-8 mt-4'>
            <div className='h-[320px] mb-8 overflow-hidden rounded-xl'>
              <AnimatedCaoursel items={staticImgs}/>
            </div>
            <div className="flex justify-between items-center">
              <h2 className=' font-otomanopee'>Other Rooms Available</h2>
              <div className='flex w-[60%] gap-x-4'>
                <div className={`relative w-full md:w-5/6 flex-grow md:flex-grow-0 px-2 lg:px-0 block`}>
                  <input className="rounded-xl w-full ps-4 border-[#6B8DE0] border p-1 bg-[#D3D3E7]" type="search" placeholder="Search"/>
                  <IoSearchSharp className='absolute lg:end-3 end-5 top-3 -translate-y-1 text-2xl flex justify-center text-[18px] text-primary font-bold'/>
                </div>
                <button className=' py-1 bg-[#D3D3E7] rounded-lg border border-[#6B8DE0] text-sm p-2'>
                  <span className=' inline-flex items-center gap-x-1 font-otomanopee text-[18px] justify-center'><VscSettings className=' text-[#595BD4]'/> Filter</span>
                </button>
              </div>
             
            </div>
            <div 
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 pt-4 ${isExpand ? "auto-rows-[241px]" :  "grid-rows-2" }`}>
              {displayList()}
            </div>
            {
              items.length > 10 ? (
                <div className='py-10 w-full flex flex-col justify-center items-center'>
                  <p className='text-[17px] font-semibold'>Continue to explore available rooms</p>
                  <button
                    type='button'
                    className='py-1 bg-primary rounded-lg text-white text-sm w-32 mt-2'
                    onClick={handleExpand}>
                    Show more
                  </button>
                </div>
              )
              :
              ""
            }
          </div>
          <Footer/>
        </main>
       
        
        
          
      
      </div>
    </>
  )
}

