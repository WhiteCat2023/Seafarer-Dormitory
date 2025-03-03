// import { BiArrowBack } from 'react-icons/bi';
import CardCarousel from '../Carousel/CardCarousel';
import Logo from "../../assets/Logo.png";
import { IoIosArrowBack } from 'react-icons/io';
import Footer from '../SubPage/Footer';
import { Link, useLocation } from 'react-router-dom';
import TopNavUser from '../Nav/TopNavUser';
import { useState } from 'react';

//Note:
    // Ang pagtarung nalang sa design igkahuman sa things to do
    //Wala nay CV sa Reservations kay gamay ra kaayu details ibutang need modal

// Things to do:
    // 1.  Implement calendar / (pending)
    // 2.  Implement check reservations per room / (pending)
    // 3.  Polish design / (pending/undecided wether ibutang ba sa home or sa diri na page)

    //By Berndt Dennis F. Canaya

export default function CVUser(){
    const location = useLocation();
    const item = location.state
    const images = Object.values(item.files);
    const [expanded, setExpanded] = useState(false);
    const maxLength = 500;

    return(
        <>
            <div>
                
                <div className={`flex container mx-auto flex-col md:w-full lg:w-[78%] pb-10`}>
                    <div>
                        <TopNavUser/>
                    </div>
                    <div className='flex items-center gap-x-4 font-semibold text-xl py-3'>
                        <Link to="/"><IoIosArrowBack className='w-10 h-10'/></Link>
                        <p className='font-otomanopee font-normal'>{item.name}</p>
                    </div>
                    <div className='px-16'>
                        <div className="grid grid-cols-1 sm:auto-rows-[180px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 auto-rows-auto">
                            <div className='col-span-4 row-span-2 overflow-hidden'>
                                <CardCarousel items={images}/>
                            </div>
                            {images?.slice(0, 2).map((image, index) => (
                                <img key={index} className={`rounded-xl object-cover col-span-2 h-full w-full row-span-1`} src={`https://seafarerdorm.scarlet2.io/Rooms/${image}`} />
                            ))}
                        </div>
                        <div className='flex w-full overflow-x-hidden mx-auto p-4 pt-6 gap-2'>
                            <div className='w-full text-start'>
                                <p className='font-bold text-xl font-otomanopee'>{item.name}</p>
                                <p className='flex'>
                                    <span>{item.pax} {item.pax.length > 1 ? "person" : "persons"}</span>
                                </p>
                                {/* <p>{item.description}</p> */}
                                {/* Truncate Description and Show "See More" */}
                                <p>
                                    {expanded || item.description.length <= maxLength
                                    ? item.description
                                    : `${item.description.slice(0, maxLength)}...`}
                                </p>

                                {/* Show "See More" button if the description is long */}
                                {item.description.length > maxLength && (
                                    <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="text-blue-500 hover:underline"
                                    >
                                    {expanded ? "See Less" : "See More"}
                                    </button>
                                )}
                            </div>
                            <div className='w-2/4 text-start px-2 py-4 border rounded-xl'>
                                {/* <p className='text-gray-800'>Location: {item.tower}</p> */}
                                <p className='text-gray-800 mb-10'>&#8369;{item.price} per {item.stayType}</p>
                                <Link to="/booking" state={item} className='w-full p-2 border bg-primary text-white rounded mt-4 block text-center'>Book Now</Link>
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
                        <iframe className='w-full rounded-xl mb-2 shadow-xl' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.291045501798!2d123.89042871079957!3d10.318576667428992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9990007a0219f%3A0x19e1f73c25c43424!2sWinland%20Towers%20Condominium!5e0!3m2!1sen!2sph!4v1739290459103!5m2!1sen!2sph" width="800" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <h3 className='font-normal text-normal ps-4 font-otomanopee'>8V9V+C6C, Juana Osmeña St, Cebu City, 6000 Cebu</h3>
                        
                    </div>
                    
                    {/* AIzaSyD90Z57bRIZ0JJFRqmlkYn_Qz3MXrOeR3o */}


                </div>
                <div className='mt-10'>
                    <Footer/>
                </div>
            </div>
        </>
        
    );
}