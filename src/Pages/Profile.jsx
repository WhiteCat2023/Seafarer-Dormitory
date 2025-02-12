import { NavLink, Outlet } from "react-router-dom"
import {BiSearchAlt } from "react-icons/bi";

function Profile() {
    const settings = [
        {name: "Profile Setting", href: "/Profile/"},
        {name: "Account Setting", href: ""},
        {name: "Setting", href: ""}
    ]
    return (
        <div className="container mx-auto sm:py-10 sm:px-4  h-full">
                <div className={`lg:flex items-center justify-between lg:mb-5 flex-col md:flex-row flex`} >
                    <nav className="flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 w-full px-3 lg:px-0">
                        <h1 className="md:text-5xl font-outfit font-semibold text-3xl text-gray-600">Profile</h1>
                    </nav>
                    <div className="relative w-full md:w-1/4 flex-grow md:flex-grow-0 px-2 lg:px-0 block">
                          <input
                            className="rounded-full w-full ps-10 border-blue-500 border-2"
                            type="search"
                            placeholder="Search"
                          />
                          <i className="absolute lg:left-3 left-5 top-3 -translate-y-1 text-2xl flex justify-center">
                            <BiSearchAlt />
                          </i>
                        </div>
                </div>
                <div className="grid grid-cols-8 h-[calc(100%-52px)] gap-4 w-full">
                    <div className="col-span-2 flex flex-col border-2 border-blue-500 rounded-xl px-2 py-3 gap-y-2">
                            {
                                settings.map((setting, index) => (
                                    <NavLink 
                                        to={setting.href}
                                        key={index}
                                        className="p-2 hover:bg-blue-50 rounded-lg">
                                        {setting.name}
                                    </NavLink>
                                ))
                            }
                    </div>
                    <div className="h-full border-2 border-blue-500 col-span-6 rounded-xl">
                        <Outlet/>
                    </div>
                </div>
            </div>
    )
}

export default Profile