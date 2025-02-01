import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Tenants from './Pages/Tenants'
import Rooms from './Pages/Rooms'
import Reports from './Pages/Reports'
import Nav from './Pages/Nav'
import History from './Pages/History'
import Root from './Pages/Root'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import CVUser from './components/CV/CVUser'
import Reservations from './Pages/Reservations'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/cv-user' elemen={<CVUser/>}/>
      <Route path='/Nav' element={<Nav/>}>
        <Route path='/Nav/Tenants' element={<Tenants/>}/>
        <Route path='/Nav/Rooms' element={<Rooms/>}/>
        <Route path='/Nav/Reports' element={<Reports/>}/>
        <Route path='/Nav/History' element={<History/>}/>
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