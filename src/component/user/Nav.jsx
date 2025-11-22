  import React, { useEffect, useState } from 'react'
  import { Link, useNavigate } from 'react-router-dom'
  import UserDropdown from './userDropDown';
  import { handleError, handleSuccess } from '../common/tosters';
  import { useDispatch, useSelector } from 'react-redux';
  import { checkUser, logout } from '../../features/action/authAction';
  import { clearMessage } from '../../features/slices/userSlice';
  import Loader from '../common/loader';

  export default function Nav() {
      const [showBar, SetBar]=useState(false);
      const [showDown, SetshowDown]=useState(false);
          const dispatch = useDispatch();
      const navigate = useNavigate();

      const { currentUser, loading, message, messageType} = useSelector((state)=>state.auth);
  // // console.log(currentUser);

      useEffect(() => {

          dispatch(checkUser())

      }, []);

  const handleLogout = async () => {
    const response = await dispatch(logout()).unwrap();
    console.log(response);
    if(response?.status==1){
      handleSuccess(`${response?.message}`)
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }else if(response?.status==0){
      handleError(response?.message)
    }

  }
  const handleDropDown = () => {
    SetBar(!showBar);
  }

    useEffect(() => {
      if (messageType !== null) dispatch(clearMessage());
    }, [message, messageType, dispatch]);
    
    return (
      <div className='flex h-15 justify-center items-center bg-blue-50'>
        {loading && <Loader/> }
      <div className='md:w-[90%] w-[100%]  flex flex-row justify-between items-center relative transition-all ease-in duration-300 '>

        <div className=' md:w-[25%] flex flex-col justify-between items-center'>
          <Link className='flex items-center flex-col px-5 md:hover:text-blue-950' to={'/'}>
                            <p className='text-3xl font-extrabold'>Swapy</p>
                        </Link>
        </div>
        <button
        onClick={()=> SetBar(!showBar)}
        className='md:hidden'>
          <i className='fa-solid fa-bars text-2xl'></i>

        </button>

          <div className={` w-full flex md:items-center justify-end md:flex-row md:gap-10 flex-col md:relative absolute
          transition-all
          md:top-0 top-12 ease-in-out  duration-300 delay-100 bg-blue-50 z-10
        ${showBar ?   "opacity-100 translate-y-0 visible scale-100 z-100" 
    : "opacity-0  -translate-y-2 invisible md:opacity-100 md:translate-y-0 md:visible md:scale-100 scale-95 "}
              `}>
  <Link
  to={'/'}
  onClick={() => { SetBar(false) }}
  className='p-1 md:hover:bg-transparent md:hover:text-blue-950 hover:bg-blue-950 hover:text-white'>
  <i className='text-2xl fa-regular fa-home'></i>
  </Link>


  {currentUser?.role=="user" ?(
      <>
  <Link
  to={'/chats'}
  onClick={() => { SetBar(false) }}
  className='p-1 md:hover:bg-transparent md:hover:text-blue-950 hover:bg-blue-950 hover:text-white'>
  <i className='text-2xl fa-regular fa-comment'></i>
  </Link>
    <UserDropdown  currentUser={currentUser} handleLogout={handleLogout} handleDropDown={handleDropDown}/>
      </>

  ):
  //     <div className='p-1 relative transition-all
  //           ease-in-out  duration-500 z-50'>
  // <div
  // onClick={()=> SetshowDown(!showDown)}
  // className='text-black p-1 md:hover:bg-transparent md:hover:text-blue-950 hover:bg-blue-950 hover:text-white '>
  //     <i className='fa-regular fa-user text-2xl '></i>
  //     <i className={`fa-solid 
  //         ${showDown? "fa-angle-up": "fa-angle-down"}`}></i>
  // </div>

  // <div className={`flex  flex-col absolute transition-all
  //           top-10 ease-in-out  duration-500  bg-blue-50 md:left-0 left-[50px]
  // ${showDown 
  //   ? "opacity-100 translate-y-0 visible scale-100" 
  //   : "opacity-0 -translate-y-2 invisible scale-95"}

          
  //             `}>
  // <Link className='p-1 hover:bg-blue-950 hover:text-white'>Home</Link>
  // <Link className='p-1 hover:bg-blue-950 hover:text-white'>Login</Link>

  // <Link className='p-1 hover:bg-blue-950 hover:text-white'>Sell</Link>
  //          </div>

  //         </div>

  (<>
  <Link
  to={'/login'}
  onClick={() => { SetBar(false) }}
  className='p-1 text-lg font-medium md:hover:bg-transparent md:hover:text-blue-950 hover:bg-blue-950 hover:text-white'>Login</Link>
  <Link
  to={'/register'}
  onClick={() => { SetBar(false) }}
  className='p-1 text-lg font-medium md:hover:bg-transparent md:hover:text-blue-950 hover:bg-blue-950 hover:text-white'>Register</Link>
  </>
  )
          }
    <Link  onClick={()=>{SetBar(false)}} className='p-1 hover:bg-blue-950 hover:text-white md:hover:text-blue-900 md:hover:bg-transparent' to={'/sellproduct'}    > 
                  <button className='border-3 px-4 py-1 rounded-3xl text-xl'><i className='fa-solid fa-plus'></i>Sell </button>
                  </Link>
          </div>
      </div>
      </div>
    )
  }
