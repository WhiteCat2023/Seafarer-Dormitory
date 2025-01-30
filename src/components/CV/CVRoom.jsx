import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import CardCarousel from '../Carousel/CardCarousel'

export default function CVRoom({isOpen, onClose, item}) {
    const images = Object.values(item.files);
    const amenities = item.amenities
    .split(/,|\s-/)
    


    console.log(amenities)
    return (
        
        <div className={` ${isOpen ? 'flex': 'none'}`}>
            <div>
                <BiArrowBack onClick={onClose}/>
            </div>
            <div>
                <CardCarousel items={images}/>
                <div>
                    
                    <p>{item.name} <span>{item.roomNumber}</span></p>
                    <p>&#8369; {item.price}</p>
                    <p>{item.tower}</p>
                    <p>Per {item.stayType}</p>
                    <p>Deck: {item.deck}</p>
                    <p>Pax: {item.pax}</p>
                    
                    <p>Amenities: {amenities.map((item, index) => (
                        <span className='me-2 bg-blue-400 p-2 text-white' key={index}>{item.trim()}</span>
                    ))}</p>
                    <p>{item.description}</p>
                </div>
            </div>
        </div>
    )
}
