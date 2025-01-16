import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from "../Spinner"
import PassLogo from "./assets/asterisk.svg"

export default function ForgotPassword({isOpen, onClose}){

    const [inputs, setInputs] = useState({emailReset: "", action: ""});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleResetPassword = (event) => {
        event.preventDefault();
        console.log(event.target.name)
        if(event.target.name == "reset_password"){
            setLoading(true)
            axios.post("https://seafarerdorm.scarlet2.io/Login/signin.php", inputs).then((response) => {
                if(response.data.status == 'success'){
                    console.log(response.data.status);
                    withReactContent(Swal).fire({
                        icon: "success",
                        title: "Email sent",
                        text: response.data.message,
                        confirmButtonColor: "#3085d6",
                    })
                    onClose()
                } else{
                    console.error(response.data.status);
                    withReactContent(Swal).fire({
                        icon: "error",
                        title: "Oops...",
                        text: response.data.message,
                        confirmButtonColor: "#3085d6",
                    })
                }
            }).catch((error) => {
                console.error(error);
                withReactContent(Swal).fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                    confirmButtonColor: "#3085d6",
                })
            }).finally(
                setLoading(false)
            )
            console.log(inputs);
        }
    }
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            {console.log(open)}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative w-full transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start flex-col ">
                            <img src={PassLogo} alt="" className='my-4 mx-auto flex shrink-0 w-20 items-center justify-center'/>
                            <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-3xl text-center font-outfit w-full font-bold text-gray-900">
                                    Forgot Password?
                                </DialogTitle>
                                <p className='text-center font-outfit'>No worries, we'll send you reset instructions</p>
                                <div className="mt-2">
                                    <form onSubmit={handleResetPassword} name='reset_password' className='w-full my-4'>
                                        <input onChange={handleChange} name="emailReset" className='w-full mb-6 sm:mb-0 border-2 rounded font-outfit border-blue-400 outline-none' type="email" placeholder='Email' required/>
                                        <div className=" sm:pt-3 flex sm:flex-row flex-col sm:justify-end">
                                            <button
                                                type="submit"
                                                onClick={handleChange}
                                                name='action'
                                                value='reset'
                                                className="inline-flex w-full justify-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                                            >
                                                {loading ? <Spinner /> : 'Reset Password'}
                                            </button>
                                            <button
                                                type="button"
                                                data-autofocus
                                                onClick={onClose}
                                                className="mt-3 sm:ml-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
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