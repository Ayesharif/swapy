import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Aside({ showAside, setShowAside }) {
  const [dropdown, setDropDown]=useState(false)
  return (
    <aside
      className={`h-full absolute  md:flex flex-col justify-between ${ 
        showAside ? 'flex' : 'hidden'
      } md:translate-x-0 md:relative absolute z-50 md:top-0 left-0  w-[200px] bg-black text-white  p-4 transition-transform duration-300`}
    >

      <ul className='flex flex-col gap-2 pt-5'>
      <button
        onClick={() => setShowAside(false)}
        className='absolute top-1 right-1 mb-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-orange-600 md:hidden'
        >
        <i className="fa-solid fa-xmark text-2xl text-white "></i> 
      </button>
        <Link to='/admin'>Dashboard</Link>

        <Link to='products'>Products</Link>
        <Link to='categories'>Category</Link>

        <Link to='users'>Users</Link>

      {/* Close button for small screen */}

        </ul>
<div className='relative bg-blue-50 rounded cursor-pointer'
onClick={()=>setDropDown(!dropdown)}
>
  <p className='text-black text-sm py-2 text-center transform transition-all ease-in-out delay-500 duration-500'>
👨‍💼 Muhammad Ayesh ▼
  </p>
  <div className={`bottom-[50px] w-full  flex items-center bg-blue-50 h-10 absolute  bg 
    ${dropdown ==true?"visible":"hidden"}
    `}>
<Link className='hover:bg-red-200 py-1 px-2 text-red-600 w-full '> Logout</Link>
  </div>
</div>
    </aside>
  );
}
