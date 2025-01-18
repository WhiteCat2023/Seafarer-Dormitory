

export default function Card({src, name, availability, price}){
    
    return(
        <>
            <div className="w-96 border rounded-3xl overflow-hidden shadow-xl" key={name}>
                <img src={src} alt="#" className="rounded-3xl"/>
                <div className="text-start w-full p-4 pt-2 text-gray-400">
                    <p className="flex justify-between"><span className="font-bold text-black">{name}</span><span>{availability}</span></p>
                    <p className="mb-2">{price}</p>
                    <button className="bg-primary text-white py-1 px-2 rounded">Book Now</button>
                </div>
            </div>
        </>
    );
}