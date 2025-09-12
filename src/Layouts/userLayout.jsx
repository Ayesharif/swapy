import React from 'react'
import{Outlet} from 'react-router-dom'
import NavBar from '../component/user/NavBar'
import Footer from '../component/common/Footer'
export default function UserLayout() {
  return (
    <div className='overflow-x-hidden '>
    <NavBar/>
        <Outlet />

    <Footer/>
      
    </div>
  )
}
