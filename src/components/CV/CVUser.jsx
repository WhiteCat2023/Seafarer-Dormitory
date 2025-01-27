import { BiArrowBack } from 'react-icons/bi';
import CardCarousel from '../Carousel/CardCarousel';

export default function CVUser({isOpen, onClose, item}){
    const src = Object.values(item.files);
    return(
        <>
            <button className='flex items-center gap-2 mt-2 ms-4' onClick={onClose}><BiArrowBack/>Back</button>
            <div className={`${isOpen ? 'block' : 'none'} container mx-auto mt-4`}>
                <div className='w-full lg:w-3/4 overflow-hidden mx-auto'>
                    <CardCarousel items={src}/>
                </div>
                <div className='flex lg:w-3/4 overflow-x-hidden mx-auto p-4 gap-2'>
                    <div className='w-full text-start'>
                        <p className='font-bold text-xl'>{item.apartment_name} {item.isAvailable ? <span className='text-base text-green-600'>{item.isAvailable}</span>: <span className='text-base text-gray-500'>{item.isAvailable}</span>}</p>
                       
                       
                        <hr className='my-4'/>
                        <p>{item.description}</p>
                    </div>
                    <div className='w-2/4 text-start px-2 py-4 border rounded-xl'>
                        <p className='text-gray-800'>Location: {item.location}</p>
                        <p className='text-gray-800'>Price: &#8369;{item.price} per {item.stay_type}</p>
                        <button className='w-full p-2 border bg-primary text-white rounded mt-4'>Book Now</button>
                    </div>
                </div>
            </div>
        </>
    );
}