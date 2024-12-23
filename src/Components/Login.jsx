import React from "react"
import Logo from "./assets/Logo.png"
import ShowCase from "./assets/showcase.jpg"

export default function Login(){
    return(
        <div className="flex flex-col lg:flex-row font-serif h-full">
            <div className="flex-none mb-8 lg:w-1/2 lg:mb-0 lg:p-4">
                <img src={ShowCase} alt="" className="w-full h-36 lg:h-full object-cover lg:rounded-xl" loading="lazy"/>
            </div>
            <div className="w-100 block lg:w-1/2 lg:flex lg:justify-center lg:flex-col">
                <img src={Logo} alt="" className="mx-auto"/>
                <h1 className="text-balance text-5xl font-normal font-orelega text-gray-900 sm:text-7xl" >Greeting!</h1>
                <h3 className="font-orelega font-normal text-gray-900 text-balance text-base lg:text-3x1">Welcome Back!</h3>
                <form action="" className="flex flex-col p-5 lg:p-11 lg:w-9/12 mx-auto">
                    <input className="border-2 p-2 mb-3 rounded font-outfit border-blue-400 outline-none" type="email" placeholder="Email"/>
                    <input className="border-2 p-2 rounded font-outfit border-blue-400 outline-none" type="password" placeholder="Password"/>
                    <div className="flex justify-between p-2 mb-10">
                        <span >
                            <input type="checkbox" className="mr-1"/>
                            <span className="font-outfit">Remember me</span>
                        </span>
                        <a href="#" className="font-outfit text-blue-500 underline">Forgot Password</a>
                    </div>
                    <a href="/Apartments" className="bg-blue-400 p-2 rounded text-white font-outfit">Login</a>
                </form>   
            </div>
        </div>
    );
}