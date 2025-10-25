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
    // // console.log(id);
    
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

const handleCategorySearch = (categoryId) => {
  navigate(`/productlisting/${categoryId}`);
  dispatch(getCategoryProducts(categoryId));
};

// // console.log(Id);


    const { products, message, messageType, loading } = useSelector((state) => state.product)

// console.log(products);


      // // console.log(category_products);
      
return (
<div className='flex w-screen min-h-[80vh] items-center flex-col '>
  {loading && <Loader/>}
 <FilterBar 
      gridView={gridView} 
      setGridView={setGridView} 
      handleCategorySearch={handleCategorySearch} // ✅ PASS FUNCTION, NOT EXECUTE
    />

  <div className='flex w-[90%] flex-col items-center'>
{(!products || products.length === 0) && (
  <h1 className="py-[25vh] font-bold">Products Not Available</h1>
)}

<div className={`
  w-[80%] grid  gap-4 py-10  
  ${gridView==true ?"sm:grid-cols-2 lg:grid-cols-3":"grid-cols-1"}
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
