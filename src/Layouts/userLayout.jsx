import React from 'react'
import{Outlet} from 'react-router-dom'
import NavBar from '../component/user/NavBar'
import Footer from '../component/common/Footer'
export default function UserLayout() {
  return (
    <div className='min-h-[100] overflow-100vh-hidden '>
    <NavBar/>
        <Outlet />

    <Footer/>
      
    </div>
  )
}
