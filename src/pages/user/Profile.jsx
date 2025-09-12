import React, { useState } from 'react'
import { products } from '../../utils/products'
import ProductCart from '../../component/user/ProductCart';

export default function Profile() {
    const [showUpdateBox, setShowUpdateBox] = useState(false);
    return (
        <div className='w-full flex flex-col items-center py-5 scroll-smooth  relative'>
            <div className={`w-[90%]  grid lg:grid-cols-[30%_1fr] grid-cols-1 gap-10
                ${showUpdateBox ==true ? "blur-sm": ""}
                `}>
                <div className='flex items-center lg:flex-col sm:flex-row flex-col gap-5'>
                    <div className='rounded-e-full  bg-blue-950 w-[90%] flex flex-col items-center'>
                        <img src="/vite.svg" className='w-[50%] object-center rounded-[50%]' alt="" />
                    </div>
                    <div className='w-full flex flex-col items-center gap-2'>

                    <div 
                    onClick={() => setShowUpdateBox(true)}
                    className='w-[90%] flex items-center justify-center border sm:py-2 py-1 rounded hover:border-3'>
                        <i className='fa-solid fa-pen '></i>
                        <p className='text-md font-medium'>Update profile</p>
                    </div>
                    <div className='w-[90%] flex items-center justify-center border sm:py-2 py-1 rounded hover:border-3'>
                        <i className='fa-solid fa-share-nodes '></i>
                        <p className='text-md font-medium'>Share user profile</p>
                    </div>
                    <div className='flex items-center w-full justify-around '>
                        <p className='font-medium text-blue-600 cursor-pointer'>Block user</p>
                        <p>|</p>
                        <p className='font-medium text-blue-600 cursor-pointer'>Report user</p>
                    </div>
                      </div>

 
                    
                </div>

                <div className='flex flex-col w-[100%] py-5 gap-10'>
                    <div className='px-2 h-20 border-b'>
                        <p className='text-4xl font-bold'>Muhammad Ali</p>
                    </div>
                    <div className='flex flex-col  justify-start  gap-2 py-2 '>
                        <label htmlFor="loaction" className="">Location</label>
                        <div className='sm:w-[30%] flex items-center justify-start border gap-5 py-2 rounded hover:border-3 px-2'>
                            <i className='fa-solid fa-location-dot text-blue-400 '></i>
                            <p className='text-md font-medium'>Hyderabad</p>
                        </div>
                    </div>

                    <div className='flex flex-col  justify-start  gap-2 py-2 '>
                        <label htmlFor="ads" className="">My Ads</label>
<div className='w-full grid md:grid-cols-3 sm:grid-cols-2 gap-3 place-content-center'>


                        { products.map((item, j)=>(
<ProductCart 
key={j}
showAction={false}
showGrid={true}
product={item}
/>
            ))
            }
                    </div>
                    </div>


                </div>
            </div>
                                <div
  className={`fixed top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[700px] h-[500px] overflow-y-scroll w-[90%] p-6 bg-blue-50 rounded shadow transition-all duration-500 ease-in-out
    ${showUpdateBox ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
    z-2
  `}
>
        <h4 className="text-xl font-semibold mb-4">Update Profile</h4>
        <i className="fa-solid fa-xmark text-3xl text-red-600 font-extrabold absolute right-5 top-5 border-2 border-black rounded p-1" 
onClick={() => setShowUpdateBox(false)}
></i>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">First Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Last Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Product Description"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">City</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="city"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="tel"
              className="w-full border px-3 py-2 rounded"
              placeholder="+923..."
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Profile Image</label>
            <input
              type="file"
              className="w-full border px-3 py-2 rounded"
              placeholder="Image URL"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            
            <button
              type="button"
              className="border-1 px-2 hover:bg-green-600 hover:text-white rounded hover:py-1"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>

        </div>
    )
}
