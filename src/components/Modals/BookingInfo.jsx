import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { BiArrowBack } from 'react-icons/bi';

export default function BookingInfo({isOpen, onClose, item}) {

    const name = item.cName.split(' ');
    const firstName = name[0];   

    return (
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
                                <div className="mt-3 text-center w-full sm:mt-0 sm:text-left relative">
                                    <BiArrowBack className='absolute top-0 left-2 text-4xl rounded-full hover:bg-blue-50 cursor-pointer p-2' onClick={onClose}/>
                                    <DialogTitle as="h3" className="text-3xl text-center font-outfit w-full font-bold text-gray-900">
                                        {firstName}'s Info
                                    </DialogTitle>
                                    <div className="p-4 md:p-5 flex flex-col gap-y-2">
                                        <p><strong>Name:</strong> {item.cName}</p>
                                        <p><strong>Email:</strong> {item.cEmail}</p>
                                        <p><strong>Phone:</strong> {item.cPhone}</p>
                                        <p><strong>Mode Of Payment:</strong> {item.modeOfPayment}</p>
                                        {/* <p>Start Date: {item.startDate}</p>
                                        <p>End Date: {item.endDate}</p> */}

                                    <p>
                                    <strong>Start Date:</strong> {new Date(item.startDate).toLocaleString('en-US', {
                                        weekday: 'long', // "Monday"
                                        year: 'numeric', // "2025"
                                        month: 'long', // "March"
                                        day: 'numeric', // "11"
                                        hour: 'numeric', // "2"
                                        minute: 'numeric', // "30"
                                        // second: 'numeric', // "00"
                                        hour12: true, // AM/PM
                                    })}
                                    </p>

                                    <p>
                                    <strong>End Date:</strong> {new Date(item.endDate).toLocaleString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        // second: 'numeric',
                                        hour12: true,
                                    })}
                                    </p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}