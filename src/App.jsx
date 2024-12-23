import './App.css'
import Login from './Components/Login'
import Apartments from './Components/Apartments'
import Tenants from './Components/Tenants'
import TransactionHistory from './Components/TransactionHistory'
import Reports from './Components/Reports'
import Nav from './Components/Nav'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/Apartments',
    element: (
      <>
        <Nav />
        <Apartments />
      </>
    ) 
  },
  {
    path: '/Tenants',
    element: (
      <>
        <Nav />
        <Tenants />
      </>
    )
  },
  {
    path: '/History',
    element: (
      <>
        <Nav />
        <TransactionHistory />
      </>
    )
  },
  {
    path: '/Reports',
    element: (
      <>
        <Nav />
        <Reports />
      </>
    )
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}