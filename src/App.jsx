import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Users from './Pages/Users'
import Rooms from './Pages/Rooms'
import Nav from './Pages/Nav'
import Root from './Pages/Root'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import CVUser from './components/CV/CVUser'
import Reservations from './Pages/Reservations'

//Note:
  // Add lang diri tan ang link sa imo mga pages :)
  // Pun e lang ayaw kuhae 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      
      {/* User Routes (User) */}
      {/* pun-e lang kung naa ka gusto e add but ayaw kuhae */}
      <Route index element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/cv-user' elemen={<CVUser/>}/>
      
      {/* Routes Nav child (Admin) */}
      <Route path='/Nav' element={<Nav/>}>
        <Route path='/Nav/Users' element={<Users/>}/>
        <Route path='/Nav/Rooms' element={<Rooms/>}/>
        <Route path='/Nav/Reservations' element={<Reservations/>}/>
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