
// import Carousel from '../Carousel/CardCarousel';
import { BiSolidStar } from "react-icons/bi";
import DefaultImage from "../../assets/default-image.png"
export default function Card({item}){
    const newSrc = Object.values(item.files);
    return(
        <>
            <div className="w-full h-full overflow-hidden cursor-pointer "  >
                <div className='h-4/6 overflow-hidden'>
                    {
                        newSrc.length > 0 ? 
                            <img 
                            src={`https://seafarerdorm.scarlet2.io/Rooms/${newSrc[0]}`}
                            className="rounded-lg object-cover h-full w-full"/> 
                        : 
                            <img src={DefaultImage}/>
                    }
                </div>
                <div className="text-start text-sm w-full pt-2 h-2/6 leading-none" key={item.id}>
                    <p className="font-normal w-full flex justify-between">{item.name}<span className="flex items-center gap-x-1"><BiSolidStar/>4.0</span></p>
                    <p className="font-light">Room {item.roomNumber}</p>
                    <p className="font-light">{item.pax} person</p>
                    <p className="font-semibold">₱{item.price} per {item.stayType}</p>
                </div>
            </div>
        </>
    );
}