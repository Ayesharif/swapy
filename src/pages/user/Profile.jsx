import React, { useEffect, useState } from 'react';
import ProductCart from '../../component/user/ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyProducts,
  getprofile,
  updateMyProduct,
  updateProfile,
} from '../../features/action/userAction';
import { handleError, handleSuccess } from '../../component/common/tosters';
import { clearMessage } from '../../features/slices/userSlice';
import { getAllUserCategories, getPublicProfile } from '../../features/action/productAction';
import Loader from '../../component/common/loader';
import UserDropdown from '../../component/user/userDropDown';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();
const userId= useParams('id')
  useEffect(() => {
    dispatch(getPublicProfile(userId.id||""));
  }, [dispatch]);
  const url =window.location.href;
  console.log(url);
 const [copySuccess, setCopySuccess] = useState('');


  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
      console.error('Failed to copy text: ', err);
    }
    // Optionally, clear the success message after a few seconds
    setTimeout(() => {
      setCopySuccess('');
    }, 2000);
  };

  const { currentUser, products, message, messageType, loading } = useSelector(
    (state) => state.product
  );




  useEffect(() => {
    if (messageType === 1) handleSuccess(message);
    else if (messageType === 0) handleError(message);
    if (messageType !== null) dispatch(clearMessage());
  }, [message, messageType, dispatch]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-5 scroll-smooth relative">
      {loading && <Loader />}
      <div
        className={`w-[90%] grid lg:grid-cols-[30%_1fr] grid-cols-1 gap-10`}
      >
        {/* === PROFILE INFO === */}
        <div className="flex items-center lg:flex-col sm:flex-row flex-col gap-5">
          <div className="rounded-e-full bg-blue-950 w-[90%] flex flex-col items-center">
{ currentUser?.image? (

<img
              src={`${currentUser.image?.image}`}
              className="w-[50%] object-center rounded-[50%]"
              alt=""
            />):(
           <i className='fa-solid fa-user text-9xl text-white p-3'></i>
            )}
          </div>
          <div className="w-full flex flex-col items-center gap-2">
            
            <div className="w-[90%] flex items-center justify-center border sm:py-2 py-1 rounded hover:border-3 cursor-pointer"
            onClick={handleCopyClick}
            >

              <div className={`flex items-center ${copySuccess ? "hidden":"block"}`}>
              <i className="fa-solid fa-share-nodes"></i>
              <p className="text-md font-medium">Share user profile</p>
              </div>
              <p className='text-md font-medium'>{copySuccess}</p>
            </div>

          </div>
        </div>

        
        <div className="flex flex-col w-full py-5 gap-10">
          <div className="px-2 h-20 border-b">
            <p className="text-4xl font-bold">{`${currentUser.firstName} ${currentUser.lastName}`}</p>
          </div>

          <div className="flex flex-col justify-start gap-2 py-2">
            <label htmlFor="loaction" className="">
              Location
            </label>
            <div className="sm:w-[30%] flex items-center justify-start border gap-5 py-2 rounded hover:border-3 px-2">
              <i className="fa-solid fa-location-dot text-blue-400"></i>
              <p className="text-md font-medium">{currentUser.city}</p>
            </div>
          </div>


          
          <div className="flex flex-col justify-start gap-10 py-2">
            <label htmlFor="ads" className="text-xl font-bold">
              My Ads
            </label>
            <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 gap-3 place-content-center">
              {products.length>0? (<>
              {products.map((item, j) => (
                <ProductCart key={j} showAction={false} showGrid={true}  product={item}/>

              ))}
              </>):("No ads Available")}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
