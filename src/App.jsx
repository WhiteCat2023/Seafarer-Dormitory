import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Rooms from './Pages/Rooms'
import Dashboard from './Pages/Dashboard'
import Statistics from './Pages/Statistics'
import Root from './Pages/Root'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import CVUser from './components/CV/CVUser'
import Reservations from './Pages/Reservations'
import ProtectedRoute from './ProtectedRoute'
import Tenants from './Pages/Tenants'
import Profile from './Pages/Profile'

//Note:
  // Add lang diri tan ang link sa imo mga pages :)
  // Pun e lang ayaw kuhae 
const user = window.localStorage.getItem("user")

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      
      {/* User Routes (User) */}
      {/* pun-e lang kung naa ka gusto e add but ayaw kuhae */}
      <Route index element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/cv-user' element={<CVUser/>}/>
      
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
            <Route path='/Profile' element={<Profile/>}/>
            <Route path="/Tenants" element={<Tenants/>}/>
            <Route path='/Statistics' element={<Statistics/>}/>
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
