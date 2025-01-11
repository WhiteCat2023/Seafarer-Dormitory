import { BiArrowBack } from "react-icons/bi";

export default function ContentViewer({isOpen, onClose, item}){
    return(
        <>
            <div className='w-full' style={{display: isOpen ? 'block': 'none', height: 'calc(100% - 50px)' }}>
                <div className='p-4'><i onClick={onClose}><BiArrowBack className='text-2xl'/></i></div>
                <p>{item.id}</p>
                <p>{item.apartment_name}</p>
                <p>{item.number_of_rooms}</p>
                <p>{item.location}</p>
                <p>{item.description}</p>
            </div>
        </>
    );
}