// import { BiArrowBack } from 'react-icons/bi';
import CardCarousel from '../Carousel/CardCarousel';
import { useState } from 'react';
import BookRoom from '../Modals/BookRoom';
import Logo from "../../assets/Logo.png";

//Note:
    // Ang pagtarung nalang sa design igkahuman sa things to do
    //Wala nay CV sa Reservations kay gamay ra kaayu details ibutang need modal

// Things to do:
    // 1.  Implement calendar / (pending)
    // 2.  Implement check reservations per room / (pending)
    // 3.  Polish design / (pending/undecided wether ibutang ba sa home or sa diri na page)

    //By Berndt Dennis F. Canaya

export default function CVUser({isOpen, onClose, item}){
    const src = Object.values(item.files);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal(){
        setIsModalOpen(true);
    }
    function closeModal(){
        setIsModalOpen(false);
    }

    return(
        <>
            <div className={` ${isModalOpen ? 'none': 'block'}`}>
                
                <div className={`${isOpen ? 'flex' : 'none'} container mx-auto mt-4 flex-col md:w-full lg:w-4/6`}>
                    <div>
                         <img src={Logo} alt="" className="lg:w-34 w-24 my-2 cursor-pointer" onClick={onClose}/>
                    </div>
                    {/* <button className='flex items-center gap-2 mt-2 ms-4' onClick={onClose}><BiArrowBack/>Back</button> */}
                    <div className='w-full overflow-hidden mx-auto '>
                        <CardCarousel items={src}/>
                    </div>
                    <div className='flex  overflow-x-hidden mx-auto p-4 gap-2'>
                        <div className='w-full text-start'>
                            <p className='font-bold text-xl'>{item.name} {item.isAvailable ? <span className='text-base text-green-600'>{item.isAvailable}</span>: <span className='text-base text-gray-500'>{item.isAvailable}</span>}</p>
                        
                        
                            <hr className='my-4'/>
                            <p>{item.description}</p>
                        </div>
                        <div className='w-2/4 text-start px-2 py-4 border rounded-xl'>
                            <p className='text-gray-800'>Location: {item.tower}</p>
                            <p className='text-gray-800'>Price: &#8369;{item.price} per {item.stayType}</p>
                            <button onClick={openModal} className='w-full p-2 border bg-primary text-white rounded mt-4'>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <BookRoom isOpen={isModalOpen} onClose={closeModal} item={item}/>}
        </>
        
    );
}