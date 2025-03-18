import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { BiX } from 'react-icons/bi';

export default function viewImage({isOpen, onClose, item}){

    return(
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <BiX className='w-16 h-16 text-white' onClick={onClose}/>
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                            transition
                            className="relative w-full h-96 transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-96 sm:max-w-5xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                
                        <img src={item} alt="" className='h-full w-full'/>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog> 
        </>
    );
}