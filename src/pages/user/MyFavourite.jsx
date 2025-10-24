import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyFavourite, getMyProducts } from '../../features/action/userAction';
import Loader from '../../component/common/loader';
import ProductCart from '../../component/user/ProductCart';

export default function MyFavourite() {
    const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getMyFavourite());
    

  }, [dispatch]);


  const { currentUser, favourite, message, messageType, loading } = useSelector(
    (state) => state.user
  );


  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-5 scroll-smooth relative">
          {loading && <Loader />}
          
         
    
            {/* <div className={`flex flex-col w-full py-5 gap-10
                   
              `}> */}
    
    
              <div className={`flex md:w-[80%] w-[80%] flex-col  justify-start gap-20 py-2`}>
                <label htmlFor="ads" className="text-2xl text-left font-bold">
                  My Favourites
                </label>
                <div className="w-[100%] grid md:grid-cols-3 sm:grid-cols-2 gap-3 place-content-center">
               
               {favourite.length>0? (<>
               
                  {favourite.map((item, j) => (
             
<ProductCart key={j} showGrid={true} showAction={false} product={item} redHeart={true}  />
                  ))}
                  </>):
                  (<><h1>No ads available </h1></>)}
                </div>
              </div>
          
    </div>
  )
}
