import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Rooms from './Pages/Rooms'

import Dashboard from './Pages/Dashboard'
import Root from './Pages/Root'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import CVUser from './components/CV/CVUser'
import Reservations from './Pages/Reservations'
import ProtectedRoute from './ProtectedRoute'

//Note:
  // Add lang diri tan ang link sa imo mga pages :)
  // Pun e lang ayaw kuhae 
const isLoggedIn = window.localStorage.getItem("isLoggedIn")
const user = window.localStorage.getItem("user")
const router = createBrowserRouter(



  createRoutesFromElements(
    // <Route path='/' element={<Root/>}>
   
    //   {/* User Routes (User) */}
    //   {/* pun-e lang kung naa ka gusto e add but ayaw kuhae */}
    //   {!isLoggedIn && (
    //     <>
    //       <Route index element={<Home/>}/>
    //       <Route path='/Login' element={<Login/>}/>
    //       <Route path='/cv-user' element={<CVUser/>}/>
    //     </>
    //   )}
      
      
    //   {/* Routes Nav child (Admin) */}
    //   <Route element={<ProtectedRoute/>}>

    //     { user != "admin" ? (
    //       <>
    //         <Route path='/Login' element={<Navigate to={"/"}/>}/>
    //         <Route index element={<Dashboard/>}/>
    //         <Route path='/Dashboard' element={<Navigate to={"/"}/>}/>
    //         <Route path='/Rooms' element={<Navigate to={"/"}/>}/>
    //         <Route path='/Reservations' element={<Navigate to={"/"}/>}/>
    //       </>
    //     ):(
    //       <>
    //         <Route path='/Login' element={<Navigate to={"/"}/>}/>
    //         <Route index element={<Dashboard/>}/>
    //         <Route path='/Dashboard' element={<Dashboard/>}/>
    //         <Route path='/Rooms' element={<Rooms/>}/>
    //         <Route path='/Reservations' element={<Reservations/>}/>
    //       </>
    //     )
    //     }
        
    //   </Route>
    // </Route>
    <Route element={<Root/>}>
      {/* User Routes (User ) */}
      {
        !isLoggedIn && (
          <>
            <Route index element={<Home/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/cv-user' element={<CVUser />}/>
          </>
        )
      }
    
      {/* Routes Nav child (Admin) */}
      <Route element={<ProtectedRoute/>}>
        <Route path='/Login' element={<Navigate to={"/"}/>}/>
    
        { user !== "admin" ? (
          <>
            <Route path='/' element={<Login/>}/>
            <Route path='/Dashboard' element={<Navigate to={"/"}/>}/>
            <Route path='/Rooms' element={<Navigate to={"/"}/>}/>
            <Route path='/Reservations' element={<Navigate to={"/"}/>}/>
          </>
        ) : (
          <>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/Rooms' element={<Rooms/>}/>
            <Route path='/Reservations' element={<Reservations/>}/>
          </>
        )}
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
