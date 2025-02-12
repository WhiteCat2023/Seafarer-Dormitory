import Logo from "../../assets/Logo.png";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { BiObjectsVerticalBottom, BiSolidDashboard, BiSolidUserRectangle, BiBuildingHouse, BiLogOut, BiSolidUserDetail, BiCalendar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUsers } from "react-icons/fa6";

//Note:
    // Ang pagtarung nalang sa design igkahuman sa things to do
    // Profile nga naa sa top sa side pending pa still figuring it out 
// Things to do:
    // 1.  Implement profile tab-view / (pending)

    //By Berndt Dennis F. Canaya

export default function TopNavAdmin({navItem}){

    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const navigate = useNavigate();
    const [userSession, setUserSession] = useState({name: '', email: ''});


    //under construction DO NOT TOUCH by Berndt
    // const fetchUserSession = async () =>{
    //     try {
    //         const response  = await axios.get("https://seafarerdorm.scarlet2.io/Login/nav-profile.php");
    //         if(response.data.status === "success"){
    //             setUserSession({name: response.data.name, email: response.data.email});
    //         }else{
    //             navigate("/login");
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    // useEffect(() => {
    //     fetchUserSession();
    // }, []);

    const renderNameIcon = (name) =>{
        switch(name){
            case 'Users':
                return <span className="flex items-center gap-x-3"><BiSolidUserRectangle className="w-5 h-5"/> {name}</span>;
            case 'Rooms':
                return <span className="flex items-center gap-x-3"><BiBuildingHouse className="w-5 h-5"/> {name}</span>;
            case 'Reservations':
                return <span className="flex items-center gap-x-3"><BiCalendar className="w-5 h-5"/> {name}</span>;
            case 'Tenants':
                return <span className="flex items-center gap-x-3"><FaUsers className="w-5 h-5"/> {name}</span>;
        }
    }
    const logout = async () => {
        try{
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('isLoggedIn')
            window.localStorage.removeItem('name')
            window.localStorage.removeItem('email')
            window.localStorage.removeItem('profile_pic')

            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('user')
            window.sessionStorage.removeItem('isLoggedIn')
            window.sessionStorage.removeItem('name')
            window.sessionStorage.removeItem('email')
            window.sessionStorage.removeItem('profile_pic')

            // Optionally, redirect the user to the login page
            window.location.href = "/"; // or use a routing method if using React Router
        }catch(err){
            console.error(err);
        }
    }
    return(
        <>
            <div className="flex sm:flex-col p-4 bg-white w-full justify-between sm:justify-start sm:w-60 z-1 sm:h-full border-e sticky top-0 left-0 sm:shadow">
                <img src={Logo} alt="" className="sm:w-26 w-24 mb-4"/>
                {/* User div*/}
                <div>
                    <p>{userSession.name}</p>
                    <p>{userSession.email}</p>
                </div>
                {/* Main */}
                <div className=" hidden lg:flex flex-col w-full justify-evenly text-start">
                    <p className="font-bold text-xs text-gray-400 mb-2">Main</p>
                    <NavLink 
                     to="/Dashboard"
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
                    to="/Statistics"
                        className="transition-all duration-150 font-outfit text-balance  px-2 py-1 hover:bg-primary hover:text-white rounded-xl">
                        <span className="flex items-center gap-x-3"><BiObjectsVerticalBottom className="w-5 h-5"/> Stats</span>
                    </NavLink>
                </div>
                <hr className="my-4"/>

                {/* Users */}
                <div className="hidden lg:flex flex-col w-full justify-evenly text-start gap-y-2">
                    <p className="font-bold text-gray-400 mb-2 text-xs">User</p>
                    <NavLink 
                        to={"/Profile"}
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
