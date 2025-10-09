import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import ProductCart from '../../component/user/ProductCart';
import FilterBar from '../../component/user/FilterBar';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveProducts, getCategoryProducts } from '../../features/action/productAction';
import Loader from '../../component/common/loader';

export default function ProductListing() {
 const [dropdown, setDropDown] = useState(false);
 const [gridView, setGridView] = useState(false);
 const [value, setvalue] = useState("");

 const { id } = useParams();
    // console.log(id);
    
    const dispatch= useDispatch();
    const navigate = useNavigate();

useEffect(()=>{
  dispatch(getCategoryProducts(id))
  // if(id){
  // }
  // else{
  //   dispatch(getActiveProducts())

  // }
},[])

    const { products, message, messageType, loading } = useSelector((state) => state.product)

console.log(products);


      // console.log(category_products);
      
return (
<div className='flex w-screen min-h-[80vh] items-center flex-col '>
  {loading && <Loader/>}
<FilterBar gridView={gridView} setGridView={setGridView} />

  <div className='flex flex-col items-center'>
<div className={`
  w-[80%] grid  gap-4 py-4  
  ${gridView==true ?"sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4":"grid-cols-1"}
  `}>
          {products.map((item, j) => (
            
            <ProductCart
                          key={j}
                          onClick={()=> navigate(`'/detailpage/${item._id}`)}
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
