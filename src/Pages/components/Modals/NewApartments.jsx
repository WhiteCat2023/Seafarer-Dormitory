import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useState } from 'react';
import { LuPlus} from "react-icons/lu";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function NewApartments({isOpen, onClose}){

    const [inputs, setInputs] = useState({apartmentName: '', numberOfRooms: 0, location: '', description: '', action: '', files: [], stayType: '', price: ''});
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(event.target.type == 'file'){
            setInputs(values => ({...values, files: Array.from(event.target.files)}));
        }else{
            setInputs(values => ({...values, [name]: value}));
        }
        
    }

    const handleAddNewApartment = (event) => {
        event.preventDefault();
        if(inputs.files.length === 0){
            console.log('No file selected');
            withReactContent(Swal).fire({
                icon: "error",
                title: "Error",
                text: 'No file selected',
                confirmButtonColor: "#3085d6",
            });
            return;
        }
        setInputs(prev => ({...prev, action: event.target.name}))
        const fd = new FormData();
        inputs.files.forEach(file => fd.append('files[]', file));
        fd.append('apartmentName', inputs.apartmentName);
        fd.append('numberOfRooms', inputs.numberOfRooms);
        fd.append('location', inputs.location);
        fd.append('description', inputs.description);
        fd.append('stayType', inputs.stayType);
        fd.append('price', inputs.price);
        fd.append('action', inputs.action);        
        
        console.log(inputs)


        axios.post('https://seafarerdorm.scarlet2.io/Apartments/apartments.php', fd).then((response) => {
            if(response.data.status == 'success'){
                withReactContent(Swal).fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                    confirmButtonColor: "#3085d6",
                });
            }else if(response.data.status == 'error'){
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Error",
                    text: response.data.message,
                    confirmButtonColor: "#3085d6",
                })
            }
        }).catch((error) => {
            console.error(error.message);
            withReactContent(Swal).fire({
                icon: "error",
                title: "Somethings not right!",
                text: error.message,
                confirmButtonColor: "#3085d6",
            })
        })
    }

    

    return(
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
                    <DialogPanel
                            transition
                            className="relative w-full transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-2 pb-4 pt-5 sm:pb-4">
                                <div className="sm:flex sm:items-start flex-col ">
                                    <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-3xl text-center font-outfit w-full font-bold text-gray-900">
                                            New Apartment
                                        </DialogTitle>
                                        <form className="p-4 md:p-5" onSubmit={handleAddNewApartment} name='add' encType="multipart/form-data">
                                            <div className='flex gap-5 flex-col lg:flex-row overflow-auto'>
                                                <div className="grid gap-4 mb-4 grid-cols-2 lg:w-2/4">
                                                    <div className="col-span-2">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Apartment Name</label>
                                                        <input onChange={handleChange} type="text" name="apartmentName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type apartment name" required/>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Number of rooms #</label>
                                                        <input onChange={handleChange} type="number" name="numberOfRooms" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="0" required=""/>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Location</label>
                                                        <input onChange={handleChange} type="text" name="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type location" required/>
                                                    </div>
                                                    <div className='col-span-2 flex'>
                                                        <div className="flex-grow-1 me-4">
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Price</label>
                                                            <input onChange={handleChange} type="number" name="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="0" required/>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <label className="block mb-2 text-sm font-medium text-gray-900 text-start">per:</label>
                                                            <select onChange={handleChange} name="stayType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required>
                                                                    <option value="">Select</option>
                                                                    <option value="days" act>Night</option>
                                                                    <option value="months">Months</option>
                                                                
                                                            </select>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-span-2">
                                                        <label className="block mb-2 text-sm font-medium text-gray-900 text-start">Apartment Description</label>
                                                        <textarea onChange={handleChange} id="description" name='description' rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write apartment description here"></textarea>                    
                                                    </div>
                                                </div>
                                                <div className='lg:w-2/4 '>
                                                    <input name='file' onChange={handleChange} type='file' multiple/>
                                                </div>
                                            </div>
                                            
                                            <button type="submit" className="text-white w-full sm:w-auto justify-center inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                                <LuPlus className='text-xl me-2'/>
                                                Add new apartment
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
    );
}