import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/action/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { handleSuccess } from '../common/tosters';
import { getprofile } from '../../features/action/userAction';

export default function Aside({ showAside, setShowAside }) {
  const [dropdown, setDropDown]=useState(false)

  const { currentUser} = useSelector((state)=>state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(()=>{
    dispatch(getprofile())
  },[])
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());                   // clear redux + localStorage
    handleSuccess("Logout Successfully"); // show toast after state clears
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  
  return (
  <aside
      className={`
        h-screen fixed top-0 left-0 z-50
        flex flex-col justify-between
        w-[200px] bg-black text-white p-4
        transform transition-transform duration-300 ease-in-out
        ${showAside ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
      `}
    >

      <ul className='flex flex-col gap-2 pt-5'>
      <button
        onClick={() => setShowAside(false)}
        className='absolute top-1 right-1 mb-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-orange-600 md:hidden'
        >
        <i className="fa-solid fa-xmark text-2xl text-white "></i> 
      </button>
        <Link onClick={()=> setShowAside(false)} to='/admin'>Dashboard</Link>
        <Link onClick={()=> setShowAside(false)} to='products'>Products</Link>
        <Link onClick={()=> setShowAside(false)} to='categories'>Category</Link>
        <Link onClick={()=> setShowAside(false)} to='users'>Users</Link>

      {/* Close button for small screen */}

        </ul>
<div className='relative bg-blue-50 rounded cursor-pointer'
onClick={()=>setDropDown(!dropdown)}
>

  <p className='text-black text-sm py-2 text-center transform transition-all ease-in-out delay-500 duration-500'>
👨‍💼 {`${currentUser?.firstName} ${currentUser?.lastName}`} ▼
  </p>
  <div className={`bottom-[50px] w-full  flex items-center bg-blue-50 h-10 absolute  bg 
    ${dropdown ==true?"visible":"hidden"}
    `}>
<button type='button' onClick={(e)=> handleLogout(e)} className='hover:bg-red-200 py-1 px-2 text-red-600 w-full '> Logout</button>
  </div>
</div>
    </aside>
  );
}