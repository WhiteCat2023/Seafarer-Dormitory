import { NavLink } from 'react-router-dom';
import TopNavUser from './components/TopNavUser';
import Card from './components/Card'
import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from './components/Spinner';

export default function Home() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = [
    {name: 'Apartments', href: ''},
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

  function displayList(){
        if(loading){
            return <Spinner/>; //buhatanan ug centered na spinner
        }
        try{
            return items.length > 0 ? (items.map(item => (
              <Card src='https://www.tollbrothersapartmentliving.com/wp-content/uploads/2023/03/005_Toll_4_11_19_UnionPl-983x720-1.jpg' key={item.id} name={item.apartment_name} price={item.price} availability={item.isAvailable}/>
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
      <div className='w-full px-4 lg:w-5/6 mx-auto flex flex-wrap gap-x-3.5 gap-y-3.5 mt-5 lg:mt-24 justify-center'>
        {displayList()}
      </div>
      
    </>
  )
}

