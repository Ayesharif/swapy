import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import SearchBar from '../../component/user/SearchBar'
import ProductCart from '../../component/user/ProductCart'
import { getActiveProducts, getAllUserCategories, searchProducts } from '../../features/action/productAction'
import Loader from '../../component/common/loader'

export default function Home() {
    const [data, setData] = useState({});
const dispatch= useDispatch();
    const navigate = useNavigate();

useEffect(()=>{
    dispatch(getActiveProducts())
    dispatch(getAllUserCategories())
},[])

const handleSearch=(e)=>{
  e.defaultPrevent();
  dispatch(searchProducts(data))
}
      const { products, categories, message, messageType, loading } = useSelector((state) => state.product)

  return (
    <div className=' w-screen flex flex-col items-center justify-center'>
{loading && <Loader/>}

     <SearchBar/>

      <div className='flex flex-wrap items-center  sm:px-30 px-10 py-10 gap-5'>
        {categories.map((item, key) => (
          <div className='flex flex-col items-center' key={key}
           onClick={()=>navigate(`/productlisting/${item._id}`)}
          >
            <div className='w-[100px] h-[100px] flex items-center justify-center bg-blue-50 rounded-2xl'>
              <img className='w-[80px] rounded-xl' src={`${item.image.image}`} alt="" />
            </div> 
            <p className='text-center font-medium'>{item.category}</p>
          </div>
        ))
        }
      </div>

<div className='sm:w-[95%] py-6 flex flex-col gap-5'>
  {categories.map((cat, i) => {
    const category_products = products.filter(
      (p) => p.category === cat._id
    );
    // console.log(products);
    // console.log(cat);
    

    if (category_products.length === 0) return null; // skip empty categories

    return (
      
      <div key={i} className='w-[95vw]  flex flex-col bg-blue-50 p-4 rounded-lg'>

        <div className='flex items-center justify-between px-5'>
          <p className='text-xl font-medium'>{cat.category}</p>
          <Link to={`/productlisting/${cat._id}`}>See all</Link>
        </div>
{// console.log(category_products)
}

        <div className='w-[100%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4 overflow-x-auto'>
          {category_products.slice(0,3).map((item, j) => (
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
