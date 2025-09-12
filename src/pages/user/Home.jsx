import React from 'react'
import { categories } from '../../utils/categories'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { products } from '../../utils/products'
import SearchBar from '../../component/user/SearchBar'
import ProductCart from '../../component/user/ProductCart'

export default function Home() {

const navigate= useNavigate();
  return (
    <div className=' w-screen flex flex-col items-center justify-center'>
     <SearchBar/>
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

<div className='sm:w-[95%] py-6 flex flex-col gap-5'>
  {categories.map((cat, i) => {
    const category_products = products.filter(
      (p) => p.category === cat.main_category
    );

    if (category_products.length === 0) return null; // skip empty categories

    return (
      
      <div key={i} className='w-[95vw]  flex flex-col bg-blue-50 p-4 rounded-lg'>
        {/* Category Header */}
        <div className='flex items-center justify-between px-5'>
          <p className='text-xl font-medium'>{cat.main_category}</p>
          <Link to={`/productlisting/${cat.main_category}`}>See all</Link>
        </div>

        {/* Category Products */}
        <div className='w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 overflow-x-auto'>
          {category_products.slice(0,4).map((item, j) => (
            <ProductCart
              key={j}
              onClick={()=> navigate('/detailpage/5')}
              showAction={false}
              showGrid={true}
 product={item}
/>

          ))}
        </div>
      </div>
    );
  })}
</div>

    </div>
  )
}
