import React from 'react'
import{Outlet} from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
export default function UserLayout() {
  return (
    <div className='overflow-x-hidden '>
    <NavBar/>
        <Outlet />

    <Footer/>
      
    </div>
  )
}
