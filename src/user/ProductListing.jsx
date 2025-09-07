import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../categories';
import { products } from '../products';

export default function ProductListing() {
 const [dropdown, setDropDown] = useState(false);
 const [gridview, setgridview] = useState(false);
 const [value, setvalue] = useState("");
 const navigate= useNavigate();
 
return (
<div className='flex w-screen min-h-[80vh] items-center flex-col '>
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
    <i onClick={()=>setgridview(false)} className='fa-solid fa-bars'></i> 
    <i onClick={()=>setgridview(true)} className='fa-solid fa-grip'></i>
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

  <div className='flex flex-col items-center'>
<div className={`
  w-[80%] grid  gap-4 py-4  
  ${gridview==true ?"sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4":"grid-cols-1"}
  `}>
          {products.map((item, j) => (
            <div
              key={j}

              className={`flex 
                ${gridview==true?"flex-col":"flex-row"}
               min-w-[30%]  border-1 border-gray-400 rounded-lg bg-white shadow hover:shadow-md transition`}
            >
              <img
                src={item.images[0]}
                alt={item.name}
                              onClick={()=> navigate(`/detailpage/${item.id}`)}
                className={`
                  ${gridview==true?"w-full":"w-[40%] "}
                  h-70 object-cover rounded`}
              />
              <div className='flex flex-col gap-3 py-2'>
              <p className='px-2 text-xl font-medium'>RS {item.price}</p>
              <p className='px-2 mt-2 text-gray-800 '>{item.name}</p>
              <p className='px-2 text-sm text-gray-600'>{item.description}</p>
              <div className='flex flex-col items-center gap-2 '>

              <button className='w-[90%] text-white bg-blue-950 border-1 lg:text-lg md:text-md text-sm  font-medium py-1 rounded-lg'
                    onClick={(e)=>setvalue('03130306029')}
                    >
                            <i className='fa-solid fa-phone'></i> Show phone number </button>
                        <button className='w-[90%]  text-blue-950 border-1 hover:border-3 border-blue-950 lg:text-lg md:text-md text-sm  font-medium py-1 rounded-lg'
                        onClick={()=> navigate('/chats')}
                        >
                            <i className='fa-solid fa-comment'></i> Chat </button>
                          </div>
              </div>
            </div>
          ))}
        </div>
  </div>
                </div>

  )
}
