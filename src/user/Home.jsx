import React from 'react'
import { categories } from '../categories'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { products } from '../products'

export default function Home() {

const navigate= useNavigate();
  return (
    <div className=' w-screen flex flex-col items-center justify-center'>
      <div className='w-[100%] h-100 flex flex-col items-center justify-center gap-10 bg-blue-950 text-white'>
        <div className='flex flex-col items-center text-center'>
          <p className='text-2xl font-bold'>Find Your Needs Here</p>
          <p className='text-lg italic'>Everything you’re looking for, all in one place</p>
        </div>
        <div className='w-[100%] flex sm:flex-row flex-col items-center  justify-center rounded-2xl'>
          <input type="text" placeholder='Search your Item' className='sm:w-[20%] w-[80%] py-2 px-1 border-2 sm:rounded-l-lg sm:rounded-t-none rounded-t-lg border-white text-white sm:border-r-0 focus:outline-0' />
          <input type="text" placeholder='Enter city' className='sm:w-[20%] w-[80%] py-2 px-1 border-2 border-white text-white  focus:outline-0' />
          <input type="text" placeholder='Enter price' className='sm:w-[20%] w-[80%] py-2 px-1 border-2 border-white text-white sm:border-r-0 focus:outline-0' />
          <button className='sm:w-20 w-[80%] px-1  border-2 white text-white py-2  sm:rounded-r-lg sm:rounded-l-none  rounded-b-lg'><i className='fa-solid fa-search'></i></button>
        </div>
      </div>
      <div className='flex flex-wrap items-center justify-center sm:px-30 py-10 gap-5'>
        {categories.map((item, key) => (
          <div className='' key={key}
           onClick={()=>navigate('/productlisting')}
          >
            <div className='w-[100px] h-[100px] flex items-center justify-center bg-blue-50 rounded-2xl'>
              <img className='w-[80px] rounded-xl' src={item.image} alt="" />
            </div> 
            <p className='text-center'>{item.main_category}</p>
          </div>
        ))
        }
      </div>

<div className='sm:w-[90%] py-6 flex flex-col gap-5'>
  {categories.map((cat, i) => {
    const category_products = products.filter(
      (p) => p.category === cat.main_category
    );

    if (category_products.length === 0) return null; // skip empty categories

    console.log(category_products)
    return (
      
      <div key={i} className='flex flex-col bg-blue-50 p-4 rounded-lg'>
        {/* Category Header */}
        <div className='flex items-center justify-between px-5'>
          <p className='text-xl font-medium'>{cat.main_category}</p>
          <Link to={`/category/${cat.main_category}`}>See all</Link>
        </div>

        {/* Category Products */}
        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
          {category_products.map((item, j) => (
            <div
              key={j}
              onClick={()=> navigate('/detailpage/5')}
              className='min-w-[30%] border-1 border-gray-400 rounded-lg bg-white shadow hover:shadow-md transition'
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className='w-full h-70 object-cover rounded'
              />
              <div className='flex flex-col gap-3 py-2'>
              <p className='px-2 text-xl font-medium'>RS {item.price}</p>
              <p className='px-2 mt-2 text-gray-800 '>{item.name}</p>
              <p className='px-2 text-sm text-gray-600'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  })}
</div>

    </div>
  )
}
