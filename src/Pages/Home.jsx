import TopNavUser from './components/TopNavUser';
import Card from './components/Card'
import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from './components/Spinner';
import CVUser from './components/CVUser';

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
              
              <Card src={item.files} key={item.id} name={item.apartment_name} price={item.price} availability={item.isAvailable} onClick={() => handleItemClick(item.id)}/>
              
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
      <TopNavUser navItem={navigation}/>
      
      <div className={` w-full lg:w-5/6 px-4 lg:px-0  mx-auto flex-col mt-5 lg:mt-24`} style={{display: isListVisible ? 'flex': 'none'}}>
        <div>Categories</div>
        <hr className='my-4'></hr>
        <div className='w-full'>
          <div>

          </div>
          <div className='w-full flex flex-wrap lg:gap-x-3.5 gap-y-2.5 justify-center'>
            {displayList()}
          </div>
        </div>
        
      </div>
      {isClicked && <CVUser onClick={isClicked} onClose={handleBackBtnClick} item={selectedItem}/>} 
    </>
  )
}

