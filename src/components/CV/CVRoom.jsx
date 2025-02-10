import React, { useState } from 'react'
import { BiArrowBack, BiEdit, BiTrash } from 'react-icons/bi'
import CardCarousel from '../Carousel/CardCarousel'

export default function CVRoom({isOpen, onClose, item}) {

    const [isEdit, setEdit] = useState(false);

    const images = Object.values(item.files);
    const amenities = item.amenities
    .split(/,|\s-/)

    return (
    //Note:
        // Diri ra imo hilabtan lance happy coding :)
        // ayaw na hilabti ang babaw na code :)
        <div className={` ${isOpen ? 'flex': 'none'} flex-col w-5/6 mx-auto`}>
            <div>
                <div className='w-full py-2 flex justify-between'>
                    <BiArrowBack className='pointer' onClick={onClose} />
                    <div className='flex gap-x-4'>
                        <BiTrash className='pointer'/>
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
                <div className='flex mt-4 mb-24'>
                    <div className='px-4'>
                        <p className='font-semibold text-xl '>{item.name} <span>{item.roomNumber}</span></p>
                        <p>&#8369; {item.price}</p>
                        <p>{item.tower}</p>
                        <hr className='my-2'/>
                        <p className='text-justify'>{item.description}</p>
                    </div>
                    <div className='border p-5 rounded-xl'>
                        <p className='truncate flex flex-wrap gap-1 leading-6'>Amenities: {amenities.map((item, index) => (
                            <span className='me-2 bg-blue-400 px-2 py-1 text-xs text-white rounded-lg' key={index}>{item.trim()}</span>
                        ))}</p>
                    
                        <p>Per {item.stayType}</p>
                        <p>Deck: {item.deck}</p>
                        <p>Pax: {item.pax}</p>
                    </div>
                </div>
            </div>
        </div>
        /////////////////////////////////////////////////////
    )
}
