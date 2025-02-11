import React from 'react'
import TopNavAdmin from './components/Nav/TopNavAdmin'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute() {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn")

    const navigation = [
        {name: 'Rooms', href: '/Rooms'},
        {name: 'Reservations', href: '/Reservations'},
    ]
    console.log(isLoggedIn)

    // return(<div className="sm:flex h-screen  overflow-y-scroll">
    //     <div className="sticky top-0 left-0">
    //         <TopNavAdmin navItem={navigation}/>
    //     </div>
    //     <Outlet/>   
    // </div>)
        return isLoggedIn === "true" ? 
            (<div className="sm:flex h-screen  overflow-y-scroll">
                <div className="sticky top-0 left-0">
                    <TopNavAdmin navItem={navigation}/>
                </div>
                <Outlet/>   
            </div>) : <Navigate to={"/Login"}/>;
}

export default ProtectedRoute