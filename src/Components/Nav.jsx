import { useState } from "react";
import Logo from "./assets/Logo.png"
import {Link} from "react-router-dom"

export default function Nav(){

    const [isMenuOpen, setIsMenuOpen] = useState(false)    

    return(
        <>
            <div className="flex justify-between items-center p-4 bg-white z-50 h-16">
                <img src={Logo} alt="" className="lg:w-40 w-36 "/>
                <div className="flex hidden lg:flex w-1/4 justify-evenly ">
                    <Link to="/Apartments" className="transition-all duration-150 font-outfit text-balance focus:bg-primary focus:text-white hover:bg-primary hover:text-white px-2 py-1 rounded-xl">Apartments</Link>
                    <Link to="/Tenants" className="transition-all duration-150 font-outfit text-balance focus:bg-primary focus:text-white hover:bg-primary hover:text-white px-2 py-1 rounded-xl">Tenants</Link>
                    <Link to="/History" className="transition-all duration-150 font-outfit text-balance focus:bg-primary focus:text-white hover:bg-primary hover:text-white px-2 py-1 rounded-xl">History</Link>
                    <Link to="/Reports" className="transition-all duration-150 font-outfit text-balance focus:bg-primary focus:text-white hover:bg-primary hover:text-white px-2 py-1 rounded-xl">Reports</Link>
                </div>
                <Link to="/" className="border-2 py-2 px-10 rounded-3xl font-outfit bg-primary text-white lg:block hidden">Profile</Link>
                <i className="bx bx-menu-alt-right lg:hidden block text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
            </div>
            <div className={`w-full bg-white lg:hidden absolute h-3/5 left-0 flex flex-col gap-2 px-2 ${isMenuOpen ? "top-16": "-top-full"} transition-all duration-200 z-0`}>
                <Link to="/Apartments" onClick={() => setIsMenuOpen(false)} className="transition-all duration-150 font-outfit text-balance hover:bg-primary hover:text-white py-4 rounded-3xl">Apartments</Link>
                <Link to="/Tenants" onClick={() => setIsMenuOpen(false)} className="transition-all duration-150 font-outfit text-balance hover:bg-primary hover:text-white py-4 rounded-3xl">Tenants</Link>
                <Link to="/History" onClick={() => setIsMenuOpen(false)} className="transition-all duration-150 font-outfit text-balance hover:bg-primary hover:text-white py-4 rounded-3xl">History</Link>
                <Link to="/Reports" onClick={() => setIsMenuOpen(false)} className="transition-all duration-150 font-outfit text-balance hover:bg-primary hover:text-white py-4 rounded-3xl">Reports</Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="transition-all duration-150 border-2 py-2 px-10 rounded-3xl font-outfit bg-primary text-white hover:bg-transparent hover:text-primary hover:border-primary">Logout</Link>
            </div>
        </>
    );
}