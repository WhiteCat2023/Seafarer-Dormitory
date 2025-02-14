import { BiLoader, BiTrash, BiChevronLeft, BiChevronsLeft, BiChevronsRight, BiChevronRight } from 'react-icons/bi';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from '@material-tailwind/react';

function TenantsTower2() {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false);
  

  const fetchData = async () => {
    setLoading(true);
    try{
      const response = await axios.get(`https://seafarerdorm.scarlet2.io/Reservations/retrieve-reservations.php`);
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

  function displayList(){
        if(loading){
        
            return <div className="w-full h-96 flex justify-center items-center">
                <Spinner className="w-10 h-10"/>; 
            </div>
        }
        try{
            return items.length > 0 ? (items.map((item, index) => (
                item.reservationStatus == "accepted" && item.tower == "tower-1" ? (
                    <div className='flex items-center border-b' key={index} id={item.id}>
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
                        <button onClick={() => accept(item.id)} className='cursor-pointer text-green-700 p-2 rounded-full text-2xl hover:bg-green-50'><BiCheck/></button>
                        <button onClick={() => decline(item.id)} className='cursor-pointer text-red-700 p-2 rounded-full text-2xl hover:bg-red-50'><BiX/></button>
                        <button className='cursor-pointer text-blue-700 p-2 rounded-full text-2xl hover:bg-blue-50' onClick={() => openModal(item.id)}><BiInfoCircle/></button>
                    </div>
                </div>
                ) : ""
            ))) : (
                <p className='h-96 w-full flex items-center justify-center text-gray-500'>No Tenants Available</p>
            )
        }catch(error){
            console.error(error);
            return <p className='h-96 w-full flex items-center justify-center text-gray-500'>Error occurred</p>
        }
    }
  return (
    // Main Section
    <div className="relative">
      <div style={{ display: 'block', height: 'calc(100% - 50px)' }}>
        <div className="border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white">
          {/* Checkbox and Action Icons */}
          <div className="flex items-center gap-x-6">
            <input className="p-2 rounded cursor-pointer" type="checkbox" />
            <i onClick={() => fetchData()} className="p-1 text-xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center"><BiLoader /></i>
            <BiTrash className="text-3xl p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center">
            <BiChevronLeft className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <BiChevronsLeft className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <p className="mx-2">1</p>
            <BiChevronsRight className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
            <BiChevronRight className="p-1 text-3xl rounded-full hover:bg-blue-100 cursor-pointer flex justify-center" />
          </div>
        </div>
        <div>
        <ul className=' w-full' id='apartment-li'>             
          {displayList()}
        </ul>
      </div>
      </div>
    </div>
  );
}

export default TenantsTower2;
