import './App.css'
import Login from './Pages/Login'
import Apartments from './Pages/Apartments'
import Tenants from './Pages/Tenants'
import TransactionHistory from './Pages/TransactionHistory'
import Reports from './Pages/Reports'
import Nav from './Pages/Nav'
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