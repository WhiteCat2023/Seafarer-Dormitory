import React from 'react'
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Footer() {
    function loginAsAdmin(){
        window.location.href = "/Login"
      }
    return (
            <footer className='pt-6 pb-10 px-8 border-t-2 border-blue-100 flex justify-between'>
            <div className='flex flex-col gap-y-4'>
                <h2 className='font-bold text-sm'>Other information</h2>
                <span className='flex items-center gap-x-4 text-xs'><FaLocationDot/><p>Juana Osmeña Extension Road, Cebu City, 6000 Cebu , Cebu City, Philippines</p></span>
                <span className='flex items-center gap-x-4 text-xs'><FaPhoneAlt/><p>0922 489 9721</p></span>
                <span className='flex items-center gap-x-4 text-xs'><MdEmail/><p>cebuseafarersdormitoryandtrans@gmail.com</p></span>
            </div>
            <div>
                <button onClick={loginAsAdmin} className='py-1 px-4 sm:px-10 bg-primary rounded-xl text-white text-sm'>Admin</button>
            </div>
            </footer>
    )
}

export default Footer