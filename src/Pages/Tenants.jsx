import 'boxicons'
import { BiClinic, BiSearchAlt, BiMap } from "react-icons/bi";
import { useState } from 'react';

export default function Tenants(){
    
    return(
        <>
            <div className="container mx-auto sm:pt-10 sm:px-4 h-full">
                <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex`} >
                    <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
                        <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Users</h1>
                        <button  className="bg-primary px-2 py-2 lg:px-3 lg:py-2 rounded-xl text-white ms-4 hover:bg-transparent hover:border-2 hover:border-blue-500 hover:text-blue-500 border-2 border-transparent flex justify-center text-sm lg:text-base flex" >
                            <i className='lg:text-2xl text-xl me-1 lg:me-2 flex justify-center'>
                                <BiClinic />
                            </i>
                            New User</button>
                    </nav>
                    <div className="relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 block">
                        <input className="rounded-full w-full ps-10 border-blue-500 border-2" type="search" placeholder="Search"/>
                        <i className='absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center'><BiSearchAlt/></i>
                    </div>
                </div>
                <div className=' relative'>
                    <div style={{ display: 'block', height: 'calc(100% - 50px)'}}>
                        <div className='border-b-2 border-blue-500 justify-between flex items-center px-4 pb-1 pt-3 sticky top-0 left-0 bg-white'>
                            <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='loader'></box-icon></i>
                            <div className='flex items-center'>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon type='solid' name='chevron-left'></box-icon></i>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevrons-left' ></box-icon></i>
                                <p className='mx-2'>1</p>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevrons-right' ></box-icon></i>
                                <i className='p-1 rounded-full hover:bg-blue-100 cursor-pointer flex justify-center'><box-icon name='chevron-right' type='solid' ></box-icon></i>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </>
    );
}