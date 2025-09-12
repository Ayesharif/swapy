import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../../utils/categories';
import { products } from '../../utils/products';
import ProductCart from '../../component/user/ProductCart';
import FilterBar from '../../component/user/FilterBar';

export default function ProductListing() {
 const [dropdown, setDropDown] = useState(false);
 const [gridView, setGridView] = useState(false);
 const [value, setvalue] = useState("");
 const navigate= useNavigate();
 
return (
<div className='flex w-screen min-h-[80vh] items-center flex-col '>
<FilterBar gridView={gridView} setGridView={setGridView} />

  <div className='flex flex-col items-center'>
<div className={`
  w-[80%] grid  gap-4 py-4  
  ${gridView==true ?"sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4":"grid-cols-1"}
  `}>
          {products.map((item, j) => (
            <ProductCart
                          key={j}
                          onClick={()=> navigate('/detailpage/5')}
                          showAction={true}
                          showGrid={gridView}
             product={item}
            />
          ))}
        </div>
  </div>
                </div>

  )
}
