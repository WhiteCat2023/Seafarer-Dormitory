import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <>
        <div>Home</div>
        <NavLink to='/Login'>Admin Login</NavLink>
    </>
  )
}

export default Home