import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    const [showbar, setshowbar] = useState(false);
    const [stickybar, setsstickybar] = useState(false);
    const [userAvail, setuserAvail] = useState(false);
    useEffect(() => {
        const handelbar = () => {
            if (window.scrollY > 200) {
                setsstickybar(true);
            }
            else {
                setsstickybar(false);
            }
        }
        window.addEventListener("scroll", handelbar);

        // cleanup
        return () => {
            window.removeEventListener("scroll", handelbar);
        };
    }, []);


    return (
        <div className={`h-20 flex  flex-row w-full items-center bg-blue-50 text-black justify-between md:justify-around transition delay-100 duration-100 z-10 
        
        `}>
        <div className={`h-20 flex  flex-row w-full items-center bg-blue-50 text-black justify-between md:justify-around transition delay-100 duration-100 z-10 
            fixed
        `}>
            <div className='md:w-[25%] flex items-center justify-center'>
                <Link className='flex items-center flex-col px-5' to={'/'}>
                    <p className='text-4xl font-extrabold'>Swapy</p>
                </Link>
            </div>
            <button type='button' className='md:hidden px-5'
                onClick={() => { setshowbar(!showbar) }}
            > <i className='fa-solid fa-bars text-2xl text-black'></i> </button>
            <div 
            onMouseLeave={()=>{setshowbar(false)}}
            className={` md:w-[50%] w-full flex flex-col md:flex-row md:items-center justify-end md:static absolute top-20  transition-all duration-300 ease-in-out overflow-hidden 
                transform md:bg-transparent bg-white  text-black gap-2 md:py-0 py-4
                     ${showbar ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4 md:max-h-none md:opacity-100 md:translate-y-0"}
                     z-2
                     gap-5 pr-5
                `}>
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/'}      >
                <i className='fa-solid fa-home text-2xl'></i>
                 </Link>
                {
                userAvail== true?(
                <>
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/chats'}    >
                
                 <i className='fa-regular fa-comment text-2xl'></i></Link>
                
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/profile'} > 
                
                <i className='fa-regular fa-user text-2xl'></i></Link>
                 </>):("")}
                {
                    userAvail == false ? (
                        <>
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/login'} >Login</Link>
                
                <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/register'}    > Register </Link>
                        </>
            ):("")
        } 
               <Link  onClick={()=>{setshowbar(false)}} className='md:px-0 px-6 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'sellproduct'}    > 
                <button className='border-3 px-4 py-1 rounded-3xl text-xl'><i className='fa-solid fa-plus'></i>Sell </button>
                 </Link>

            </div>
        </div>
        </div>
    )
}
