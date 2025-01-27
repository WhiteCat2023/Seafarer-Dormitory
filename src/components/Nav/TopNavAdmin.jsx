import Logo from "../../assets/Logo.png";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { signOut } from "firebase/auth";
import { BiObjectsVerticalBottom, BiSolidDashboard, BiSolidUserRectangle, BiSolidBuilding, BiBuildingHouse, BiLogOut, BiSolidUserDetail } from "react-icons/bi";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function TopNavAdmin({navItem}){

    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const navigate = useNavigate();

    const renderNameIcon = (name) =>{
        switch(name){
            case 'Users':
                return <span className="flex items-center gap-x-3"><BiSolidUserRectangle className="w-5 h-5"/> {name}</span>;
            case 'Apartments':
                return <span className="flex items-center gap-x-3"><BiSolidBuilding className="w-5 h-5"/> {name}</span>;
            case 'Rooms':
                return <span className="flex items-center gap-x-3"><BiBuildingHouse className="w-5 h-5"/> {name}</span>
        }
    }
    const logout = async () => {
        try{
            await signOut(auth);
            navigate("/Login");
        }catch(err){
            console.error(err);
        }
    }
    return(
        <>
            <div className="flex sm:flex-col p-4 bg-white w-full justify-between sm:justify-start sm:w-60 z-1 sm:h-full border-e sticky top-0 left-0 sm:shadow">
                <img src={Logo} alt="" className="sm:w-26 w-24 mb-4"/>

                {/* Main */}
                <div className=" hidden lg:flex flex-col w-full justify-evenly text-start">
                    <p className="font-bold text-xs text-gray-400 mb-2">Main</p>
                    <NavLink 
                        className="transition-all duration-150 font-outfit text-balance  px-2 py-1 hover:bg-primary hover:text-white rounded-xl">
                         <span className="flex items-center gap-x-3"><BiSolidDashboard className="w-5 h-5"/> DashBoard</span>
                    </NavLink>
                </div>
                <hr className="my-2"/>

                {/* Lists */}
                <div className=" hidden lg:flex flex-col w-full justify-evenly text-start gap-y-2">
                    <p className="font-bold text-gray-400 text-xs">Lists</p>
                    {navItem.map((item) => (
                        <NavLink 
                            key={item.name} 
                            to={item.href} 
                            className="transition-all duration-150 font-outfit text-balance  px-2 py-1 hover:bg-primary hover:text-white rounded-xl">
                                {renderNameIcon(item.name)}
                        </NavLink>
                    ))}     
                </div>

                {/* Useful */}
                <hr className="my-4"/>
                <div className=" hidden lg:flex flex-col w-full justify-evenly text-start ">
                    <p className="font-bold text-gray-400 mb-2 text-xs">Useful</p>
                    <NavLink 
                        className="transition-all duration-150 font-outfit text-balance  px-2 py-1 hover:bg-primary hover:text-white rounded-xl">
                        <span className="flex items-center gap-x-3"><BiObjectsVerticalBottom className="w-5 h-5"/> Stats</span>
                    </NavLink>
                </div>
                <hr className="my-4"/>

                {/* Users */}
                <div className="hidden lg:flex flex-col w-full justify-evenly text-start gap-y-2">
                    <p className="font-bold text-gray-400 mb-2 text-xs">User</p>
                    <NavLink 
                        className="transition-all duration-150 font-outfit text-balance  px-2 py-1 hover:bg-primary hover:text-white rounded-xl">
                        <span className="flex items-center gap-x-3"><BiSolidUserDetail className="w-5 h-5"/> Profile</span>
                    </NavLink>
                    <button 
                        onClick={logout}
                        className="transition-all duration-150 font-outfit text-balance  px-2 py-1 hover:bg-primary hover:text-white rounded-xl">
                        <span className="flex items-center gap-x-3"><BiLogOut className="w-5 h-5"/> Logout</span>
                    </button>
                </div>
                <i className="bx bx-menu-alt-right lg:hidden block text-2xl lg:text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>
            </div>
            <div className={`w-full bg-white lg:hidden absolute h-3/5 left-0 flex flex-col gap-2 px-2 ${isMenuOpen ? "top-16": "-top-full"} transition-all duration-200 z-50`}>
                {navItem.map((item) => (
                    <NavLink 
                        key={item.href}
                        to={item.href} 
                        onClick={() => setIsMenuOpen(false)} 
                        className="transition-all duration-150 font-outfit text-balance hover:bg-primary hover:text-white py-4 rounded-3xl">
                            {item.name}
                    </NavLink>
                ))}
            </div>
        </>
    ); 
}