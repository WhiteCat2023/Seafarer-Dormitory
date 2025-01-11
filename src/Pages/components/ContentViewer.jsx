import { BiArrowBack } from "react-icons/bi";

export default function ContentViewer({isOpen, onClose, item}){
    return(
        <>
            <div className='w-full text-start' style={{display: isOpen ? 'block': 'none', height: 'calc(100% - 50px)' }} id={'item-id-' + item.id}>
                <div className='p-4'><i onClick={onClose}><BiArrowBack className='text-2xl'/></i></div>
                <div className="lg:px-8 pb-8 flex overflow-hidden flex-col-reverse lg:flex-row" style={{height:'calc(100% - 56px)'}}>
                    <div className="lg:w-2/4 overflow-y-auto">
                        <p className="font-semibold text-gray-700 text-2xl">{item.apartment_name}</p>
                        <p className="text-gray-500"> Number of rooms: <span className="text-black">{item.number_of_rooms}</span></p>
                        <p className="">{item.location}</p>
                        <p className="lg:mt-10 me-8 text-justify ">{item.description}</p>
                    </div>
                    <div className="lg:w-2/4 h-full flex justify-center">
                        <img className="h-full" src="https://www.tollbrothersapartmentliving.com/wp-content/uploads/2023/03/005_Toll_4_11_19_UnionPl-983x720-1.jpg"/>
                    </div>
                </div>
            </div>
        </>
    );
}