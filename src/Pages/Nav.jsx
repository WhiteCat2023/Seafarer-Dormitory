import { useState } from "react";
import Logo from "./assets/Logo.png"
import {NavLink, Outlet} from "react-router-dom"

export default function Nav(){

    const [isMenuOpen, setIsMenuOpen] = useState(false);  
    
    const navigation = [
        {name: 'Apartments', href: '/'},
        {name: 'Tenants', href: '/Tenants'},
        {name: 'History', href: '/History'},
        {name: 'Reports', href: '/Reports'},
    ]

    return(
        <>
           <div className="flex justify-between items-center p-4 bg-white z-50 h-16">
                <img src={Logo} alt="" className="lg:w-40 w-24 "/>
                <div className="flex hidden lg:flex w-1/4 justify-evenly ">
                    {navigation.map((item) => (
                        <NavLink 
                            key={item.name} 
                            to={item.href} 
                            className={({isActive}) => {
                                return "transition-all duration-150 font-outfit text-balance  px-2 py-1 " + 
                                (!isActive ? 'hover:bg-primary hover:text-white rounded-xl' : 'bg-primary text-white rounded-xl')
                            }}>
                                {item.name}
                        </NavLink>
                    ))}     
                </div>
                <NavLink to="/" className="border-2 py-2 px-10 rounded-3xl font-outfit bg-primary text-white lg:block hidden">Profile</NavLink>
                <i className="bx bx-menu-alt-right lg:hidden block text-2xl lg:text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
            </div>
            <div className={`w-full bg-white lg:hidden absolute h-3/5 left-0 flex flex-col gap-2 px-2 ${isMenuOpen ? "top-16": "-top-full"} transition-all duration-200 z-50`}>
                {navigation.map((item) => (
                    <NavLink 
                        key={item.href}
                        to={item.href} 
                        onClick={() => setIsMenuOpen(false)} 
                        className="transition-all duration-150 font-outfit text-balance hover:bg-primary hover:text-white py-4 rounded-3xl">
                            {item.name}
                    </NavLink>
                ))}
            </div>
            <Outlet/>   
        </>
    );
}