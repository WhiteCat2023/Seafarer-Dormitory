import { BiArrowBack, BiMap, BiEdit, BiTrash } from "react-icons/bi";

export default function ContentViewer({isOpen, onClose, item}){
    return(
        <>
            <div className='w-full text-start h-full text-gray-600' style={{display: isOpen ? 'block': 'none'}} id={'item-id-' + item.id}>
                <div className='p-4 pb-1 flex justify-between text-2xl'>
                    <i onClick={onClose} className="rounded-full hover:bg-blue-100 p-1"><BiArrowBack/></i>
                    <div className="flex w-24 justify-evenly">
                        <i className="rounded-full hover:bg-blue-100 p-1"><BiEdit/></i>
                        <i className="rounded-full hover:bg-blue-100 p-1"><BiTrash/></i>
                    </div>
                </div>
                <div className="lg:ps-8 pb-8 flex overflow-auto lg:overflow-hidden flex-col items-center lg:flex-row" style={{height:'calc(100% - 56px)'}}>
                    <div className="lg:w-2/4 h-full flex justify-center p-4">
                        <img className="h-full rounded-2xl" src="https://www.tollbrothersapartmentliving.com/wp-content/uploads/2023/03/005_Toll_4_11_19_UnionPl-983x720-1.jpg"/>
                    </div>
                    <div className="lg:w-2/4 lg:overflow-y-auto h-full mx-4 lg:me-0 pt-4 lg:px-8 ">
                        <span className="flex items-center">
                            <p className="font-semibold text-gray-700 text-2xl">{item.apartment_name}<span className="text-sm text-gray-400"> ({item.isAvailable == 1? 'Available' : 'Unavailable'})</span></p>
                        </span>
                        <p className="text-gray-500"> Number of rooms: <span className="text-black">{item.number_of_rooms}</span></p>
                        <p className="flex"><BiMap/>{item.location}</p>
                        <p className="mt-10 text-sm md:text-base text-justify ">{item.description}</p>
                    </div>
                    
                </div>
            </div>
        </>
    );
}