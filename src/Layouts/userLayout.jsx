import React from 'react'
import{Outlet} from 'react-router-dom'
import NavBar from '../component/user/NavBar'
import Footer from '../component/common/Footer'
import Nav from '../component/user/Nav'
export default function UserLayout() {
  return (
    <div className='min-h-[100] overflow-100vh-hidden overflow-hidden'>
    <Nav/>
        <Outlet />

    <Footer/>
      
    </div>
  )
}
