import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Apartments from './Pages/Apartments'
import Tenants from './Pages/Tenants'
import TransactionHistory from './Pages/TransactionHistory'
import Reports from './Pages/Reports'
import Nav from './Pages/Nav'
import Root from './Pages/Root'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home/>
//   },
//   {
//     path: '/Login',
//     element: <Login />
//   },
//   {
//     path: '/Apartments',
//     element: (
//       <>
//         <Nav />
//         <Apartments />
//       </>
//     ) 
//   },
//   {
//     path: '/Tenants',
//     element: (
//       <>
//         <Nav />
//         <Tenants />
//       </>
//     )
//   },
//   {
//     path: '/History',
//     element: (
//       <>
//         <Nav />
//         <TransactionHistory />
//       </>
//     )
//   },
//   {
//     path: '/Reports',
//     element: (
//       <>
//         <Nav />
//         <Reports />
//       </>
//     )
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Nav' element={<Nav/>}>
        <Route index path='/Nav/Apartments' element={<Apartments/>}/>
        <Route path='/Nav/Tenants' element={<Tenants/>}/>
        <Route path='/Nav/History' element={<TransactionHistory/>}/>
        <Route path='/Nav/Reports' element={<Reports/>}/>
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