import React, { useState } from 'react'
import { categories } from '../../utils/categories';
import { Link } from 'react-router-dom';

export default function FilterBar({gridView, setGridView}) {
     const [dropdown, setDropDown] = useState(false);

  return (
  <div className='w-full py-4 flex justify-around items-center flex-wrap gap-5 shadow-lg'>
    <div className='relative border-1 px-2 rounded cursor-pointer '
onClick={()=>setDropDown(!dropdown)}
>
  <p className='text-black py-2 text-center transform transition ease-in-out delay-500 duration-500 w-[200px]'>

All Categories <i className={`fa-solid ${ dropdown==true?"fa-angle-down":"fa-angle-up"}`}></i>
  </p>
  <div className={`w-full flex flex-col items-center bg-blue-50  absolute  bg 
    ${dropdown ==true?"visible":"hidden"}
    `}>
      { categories.map((category, key)=>(
<Link key={key} className='hover:bg-blue-100 py-1 px-2  w-full '> {category.main_category}</Link>
))
}
  </div>
</div>
<div className='text-center'>
  <p className='w-[200px] flex flex-row items-center justify-center gap-2 text-lg'>View: 
    <i onClick={()=>setGridView(false)} className='fa-solid fa-bars'></i> 
    <i onClick={()=>setGridView(true)} className='fa-solid fa-grip'></i>
    </p>
</div>
<div>
  <select className='px-2 border-1 py-2 rounded' name="" id="">
    <option  defaultChecked value="newlisted">Newly Listed</option>
    <option  value="lowtohigh">Low to High</option>
    <option  value="hightolow">High to Low</option>

  </select>
</div>
  </div>
  )
}
