import { useState } from "react";
import { BiArrowBack, BiMap, BiEdit, BiTrash } from "react-icons/bi";
import EditApartments from "../Modals/EditApartments";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from 'axios';

export default function ContentViewer({isOpen, onClose, item}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
   
    const closeModal = () => setIsModalOpen(false);

    function deleteItem(event) {
        event.preventDefault();
        withReactContent(Swal).fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            const fd = new FormData();
            fd.append('id', item.id);
            fd.append('actionType', 'delete');
            if(result.isConfirmed){
                axios.post(`https://seafarerdorm.scarlet2.io/Apartments/apartments.php`, fd).then(response => {
                    if (response.data.status === 'success') {
                        // Show success message
                        withReactContent(Swal).fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: response.data.message,
                            confirmButtonColor: '#3085d6',
                        });
                        // Optionally, refresh the list or update the state
                    } else {
                        // Show error message
                        withReactContent(Swal).fire({
                            icon: 'error',
                            title: 'Error',
                            text: response.data.message,
                            confirmButtonColor: '#3085d6',
                        });
                    }
                }).catch(error => {
                    console.error(error);
                    withReactContent(Swal).fire({
                        icon: 'error',
                        title: 'Something went wrong!',
                        text: error.message,
                        confirmButtonColor: '#3085d6',
                    });
                });
            }else{
                withReactContent(Swal).fire({
                    icon: 'error',
                    title: 'Cancelled',
                    confirmButtonColor: '#3085d6',
                });
            }
        });
    }
    
    return(
        <>
            <div className='w-full text-start h-full text-gray-600' style={{display: isOpen ? 'block': 'none'}} id={'item-id-' + item.id}>
                <div className='p-4 pb-1 flex justify-between text-2xl'>
                    <i onClick={onClose} className="rounded-full hover:bg-blue-100 p-1"><BiArrowBack/></i>
                    <div className="flex w-24 justify-evenly">
                        <button onClick={openModal} className="rounded-full hover:bg-blue-100 p-1"><BiEdit/></button>
                        <button onClick={deleteItem} className="rounded-full hover:bg-blue-100 p-1"><BiTrash/></button>
                    </div>
                </div>
                <div className="flex overflow-auto lg:overflow-hidden items-center flex-col w-full" style={{height:'calc(100% - 56px)'}}>
                    <div className="lg:w-2/4 h-full flex justify-center p-4">
                        <img className="h-full rounded-2xl" src="https://www.tollbrothersapartmentliving.com/wp-content/uploads/2023/03/005_Toll_4_11_19_UnionPl-983x720-1.jpg"/>
                    </div>
                    <div className=" w-full lg:overflow-y-auto h-full lg:me-0 pt-4 px-4 lg:px-8 ">
                        <span className="flex items-center">
                            <p className="font-semibold text-gray-700 text-2xl">{item.apartment_name}<span className="text-sm text-gray-400"> ({item.isAvailable == 'Available'? 'Available' : 'Unavailable'})</span></p>
                        </span>
                        <p className="text-gray-500"> Number of rooms: <span className="text-black">{item.number_of_rooms}</span></p>
                        <p className="flex"><BiMap/>{item.location}</p>
                        <p className="mt-10 text-sm md:text-base text-justify ">{item.description}</p>
                    </div>
                    
                </div>
            </div>
            <EditApartments isOpen={isModalOpen} onClose={closeModal} item={item}/>
        </>
    );
}