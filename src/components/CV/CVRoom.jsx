import React, { useState } from 'react'
import { BiArrowBack, BiEdit, BiTrash } from 'react-icons/bi'
import CardCarousel from '../Carousel/CardCarousel'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import EditRoom from '../../Pages/EditRoom'
import axios from 'axios';

export default function CVRoom({isOpen, onClose, item}) {

    const [isEdit, setEdit] = useState(false);

    const images = Object.values(item.files);
    const amenities = item.amenities
    .split(/,|\s-/)

    function deleteRoom(id){
        withReactContent(Swal).fire({
            icon: "question",
            title: `Do you want to delete ${item.name}?`,
            confirmButtonText: "Yes",
            confirmButtonColor: "#3085d6",
            showDenyButton: true,
            denyButtonText: "No",
            denyButtonColor: "#ff0000"
        }).then((result) => {
            if(result.isConfirmed){
                handleDeleteRoom(id)
            }
        })
    }

    const handleDeleteRoom = async (id) => {
        const fd = new FormData()
        fd.append("id", id)
        try{
            const response = await axios.post("https://seafarerdorm.scarlet2.io/Rooms/delete-single-room.php", fd)
            if(response.data.status == "success"){
                window.location.href = "/Rooms"
            }else{
                withReactContent(Swal).fire({
                    icon: "warning",
                    title: response.data.status,
                    text: response.data.message,
                    confirmButtonColor: "#3085d6" 
                })
            }
        }catch(err){
            console.log(item)
            console.log("Delete Error" + err.message)
            withReactContent(Swal).fire({
                icon: "warning",
                title: "Network Error",
                text: "There was a problem processing your request",
                confirmButtonColor: "#3085d6" 
            }).then((result) => {
                if(result.isConfirmed){
                    window.location.href = "/Rooms"
                }
            })
        }
    }

    function handleBack(){
        setEdit(false)
    }

    return (
    //Note:
        // Diri ra imo hilabtan lance happy coding :)
        // ayaw na hilabti ang babaw na code :)
        <div className={` ${isOpen ? 'flex': 'none'} flex-col w-5/6 mx-auto`}>
            <div className={`${!isEdit ? "block": "hidden"}`}>
                <div className='w-full py-2 flex justify-between'>
                    <BiArrowBack className='pointer' onClick={onClose} />
                    <div className='flex gap-x-4'>
                        <BiTrash onClick={() => deleteRoom(item.id)} className='pointer'/>
                        <BiEdit className='pointer' onClick={() => setEdit(true)}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:auto-rows-[180px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 auto-rows-auto">
                    <div className='col-span-4 row-span-2'>
                        <CardCarousel items={images}/>
                    </div>
                    {images?.slice(0, 2).map((image, index) => (
                            <img key={index} className={`rounded-xl object-cover col-span-2 h-full w-full row-span-1`} src={`https://seafarerdorm.scarlet2.io/Rooms/${image}`} />
                        ))}
                </div>
                <div className='grid mt-4 mb-24 w-full grid-cols-6'>
                    <div className='px-4 col-span-4'>
                        <p className='font-semibold text-xl '>{item.name} <span>{item.roomNumber}</span></p>
                        <p>&#8369; {item.price} <span>per {item.stayType}</span></p>
                        <p>{item.tower}</p>
                        <hr className='my-2'/>
                        <p className='text-justify'>{item.description}</p>
                    </div>
                    <div className='border p-5 rounded-xl col-span-2'>
                        <p className='truncate flex flex-wrap gap-1 leading-6'>Amenities: {amenities.map((item, index) => (
                            <span className='me-2 bg-blue-400 px-2 py-1 text-xs text-white rounded-lg' key={index}>{item.trim()}</span>
                        ))}</p>
                        <p>Deck: {item.deck}</p>
                        <p>Pax: {item.pax}</p>
                    </div>
                </div>
            </div>
            {isEdit && <EditRoom item={item} isOpen={isEdit} onClose={() => handleBack()}/>}
        </div>
    )
}
