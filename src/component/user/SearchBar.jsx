import React from 'react'

export default function SearchBar() {
  return (
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
  )
}
