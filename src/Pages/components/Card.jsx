
import Carousel from './CardCarousel';

export default function Card({ src, name, availability, price, onClick}){
    const newSrc = Object.values(src);
    return(
        <>
            <div className="w-2/4 sm:w-1/4  sm:border sm:rounded-3xl overflow-hidden sm:shadow-xl cursor-pointer sm:pb-4 p-1 sm:p-0"  >
                <div className='w-full h-3/4'>
                    <Carousel items={newSrc}/>
                </div>
                <div className="text-start w-full p-4 pt-2 text-gray-400" key={name} onClick={onClick}>
                    <p className="flex justify-between"><span className="font-bold text-black">{name}</span><span>{availability}</span></p>
                    <p className="mb-2">{price}</p>
                </div>
            </div>
        </>
    );
}