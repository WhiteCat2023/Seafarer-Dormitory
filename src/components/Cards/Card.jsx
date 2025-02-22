
import Carousel from '../Carousel/CardCarousel';

export default function Card({ src, name, availability, price, onClick}){
    const newSrc = Object.values(src);
    return(
        <>
            <div className="w-full h-full sm:border sm:rounded-xl overflow-hidden sm:shadow-xl cursor-pointer "  >
                <div className='h-48'>
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