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
            setItems(response.data);
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
              <Card src="https://static.vecteezy.com/system/resources/previews/001/840/612/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" name={item.apartment_name} price={item.price} availability={item.isAvailable}/>
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
      <div className='w-5/6 mx-auto flex flex-wrap gap-x-3.5 gap-y-3.5 mt-24 justify-center'>
        {displayList()}
      </div>
      
    </>
  )
}

