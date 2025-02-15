import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export default function BookRoom({isOpen, onClose, item}) {

    const [inputs, setInputs] = useState({name: '', email: '', phone: ''});

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setInputs(inputs => ({...inputs, [name]: value}));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('name', inputs.name);
        fd.append('email', inputs.email);
        fd.append('phone', inputs.phone);
        fd.append('roomId', item.id);
        fd.append('tower', item.tower);

        try{
            const response = await axios.post('https://seafarerdorm.scarlet2.io/Rooms/book-room.php', fd);
            if(response.data.status === 'success'){
                withReactContent(Swal).fire({
                    icon: response.data.status,
                    title: "Success",
                    text: response.data.message,
                    confirmButtonColor: "#3085d6",
                });
            }else if( response.data.status === 'error'){
                withReactContent(Swal).fire({
                    icon: response.data.status,
                    title: "Error",
                    text: response.data.message,
                    confirmButtonColor: "#3085d6",
                });
            };
        }catch(error){
            withReactContent(Swal).fire({
                icon: 'error',
                title: "Error",
                text: error.message,
                confirmButtonColor: "#3085d6",
            });
        };
        // console.log(inputs);
    }
    return (
        <>
                <Dialog open={isOpen} onClose={onClose} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                                transition
                                className="relative w-full transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="bg-white px-2 pb-4 pt-5 sm:pb-4">
                                    <div className="sm:flex sm:items-start flex-col ">
                                        <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3" className="text-3xl text-center font-outfit w-full font-bold text-gray-900">
                                                Book Apartment
                                            </DialogTitle>
                                            <form className="p-4 md:p-5" onSubmit={handleSubmit} encType="multipart/form-data">
                                                <div className='flex gap-5 flex-col lg:flex-row overflow-auto'>
                                                    <div className="grid gap-4 mb-4 grid-cols-2 w-full">
                                                        <div className="col-span-2">
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Apartment Name</label>
                                                            <input onChange={handleChange} type="text" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Full Name" required=""/>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Contact Number</label>
                                                            <input onChange={handleChange} type="number" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Contact Number" required=""/>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Email</label>
                                                            <input onChange={handleChange} type="text" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Email" required=""/>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <button type="submit" className="text-white w-full sm:w-auto justify-center inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                                    Book Now
                                                </button>
                                            </form>    
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog> 
            </>
    )
}