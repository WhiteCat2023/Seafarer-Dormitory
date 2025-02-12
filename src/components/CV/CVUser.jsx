// import { BiArrowBack } from 'react-icons/bi';
import CardCarousel from '../Carousel/CardCarousel';
import { useState } from 'react';
import BookRoom from '../Modals/BookRoom';
import Logo from "../../assets/Logo.png";
import { IoIosArrowBack } from 'react-icons/io';
import Footer from '../SubPage/Footer';

//Note:
    // Ang pagtarung nalang sa design igkahuman sa things to do
    //Wala nay CV sa Reservations kay gamay ra kaayu details ibutang need modal

// Things to do:
    // 1.  Implement calendar / (pending)
    // 2.  Implement check reservations per room / (pending)
    // 3.  Polish design / (pending/undecided wether ibutang ba sa home or sa diri na page)

    //By Berndt Dennis F. Canaya

export default function CVUser({isOpen, onClose, item}){
    const images = Object.values(item.files);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal(){
        setIsModalOpen(true);
    }
    function closeModal(){
        setIsModalOpen(false);
    }

    return(
        
    //Note: 
        //Diri ra sad imong hilabtan dong ang mga div ra imong designan :)


        <>
            <div className={` ${isModalOpen ? 'none': 'block'}`}>
                
                <div className={`${isOpen ? 'flex' : 'none'} container mx-auto mt-4 flex-col md:w-full lg:w-4/6 pb-10`}>
                    <div>
                         <img src={Logo} alt="" className="lg:w-34 w-24 my-2 cursor-pointer" onClick={onClose}/>
                    </div>
                    <div className='flex items-center gap-x-4 font-semibold text-xl py-3'>
                        <IoIosArrowBack onClick={onClose}/>
                        <h2>{item.name}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:auto-rows-[180px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 auto-rows-auto">
                        <div className='col-span-4 row-span-2'>
                            <CardCarousel items={images}/>
                        </div>
                        {images?.slice(0, 2).map((image, index) => (
                            <img key={index} className={`rounded-xl object-cover col-span-2 h-full w-full row-span-1 shadow-xl`} src={`https://seafarerdorm.scarlet2.io/Rooms/${image}`} />
                        ))}
                    </div>
                    <div className='flex  overflow-x-hidden mx-auto p-4 pt-10 gap-2'>
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
                    <h3 className='font-semibold p-2'>More pictures</h3>
                    <div className='grid grid-cols-1 sm:auto-rows-[180px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 auto-rows-auto mb-4'>
                        {
                            images?.slice(2,).map((image, index) => (
                                <img key={index} className={`rounded-xl object-cover col-span-1 h-full w-full row-span-1 shadow-xl`} src={`https://seafarerdorm.scarlet2.io/Rooms/${image}`} />
                            ))
                        }
                    </div>
                    <h3 className='font-semibold p-2'>Location</h3>
                    <iframe className='w-full rounded-xl mb-4 shadow-xl' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.291045501798!2d123.89042871079957!3d10.318576667428992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9990007a0219f%3A0x19e1f73c25c43424!2sWinland%20Towers%20Condominium!5e0!3m2!1sen!2sph!4v1739290459103!5m2!1sen!2sph" width="800" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <h3 className='font-semibold p-2'>8V9V+C6C, Juana Osmeña St, Cebu City, 6000 Cebu</h3>
                    
                    {/* AIzaSyD90Z57bRIZ0JJFRqmlkYn_Qz3MXrOeR3o */}


                </div>
                <div className='mt-10'>
                    <Footer/>
                </div>
            </div>
            {isModalOpen && <BookRoom isOpen={isModalOpen} onClose={closeModal} item={item}/>}
        </>
        
    );
}