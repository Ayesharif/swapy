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
    // dispatch(getMyProducts());
    // dispatch(getAllUserCategories());
  }, [dispatch]);

  const { currentUser, products, message, messageType, loading } = useSelector(
    (state) => state.product
  );
  const { categories } = useSelector((state) => state.product);

  const [showProductBox, setShowProductBox] = useState(false);
  const [showImages, setShowImages] = useState({});
  const [data, setData] = useState({});
  const [Fav, setfav] = useState(false);
  const [showUpdateBox, setShowUpdateBox] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setData((prev) => ({
      ...prev,
      newImages: files,
    }));
  };

  const updateImages = (image) => {
    const preview = data?.images?.filter((item) => item !== image);
    setData({ ...data, images: preview });
  };

  const editData = (e, data) => {
    e.preventDefault();
    setData(data);
    console.log(data);
    
    setTimeout(() => setShowUpdateBox(true), 300);
  };

  const handelField = (e) => {
    if (e.target.type === 'file') {
      setData({ ...data, image: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
console.log(data);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('city', data.city);
    formData.append('phone', data.phone);
    formData.append('imageId', currentUser.image?.publicId);

    if (data.image) {
      formData.append('images', data.image);
    }

    dispatch(updateProfile(formData));
    setData({});

    if (!loading) {
      setTimeout(() => setShowUpdateBox(false), 300);
    }
  };

  const updateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('productType', data.productType);
    formData.append('category', data.category);
    formData.append('images', JSON.stringify(data.images));

    if (data.newImages?.length > 0) {
      data.newImages.forEach((file) => {
        formData.append('newImages', file);
      });
    }

    const payload = { formData, id: data._id };
    dispatch(updateMyProduct(payload));
    setData({});

    if (!loading) {
      setTimeout(() => setShowProductBox(false), 300);
    }
  };

  useEffect(() => {
    if (messageType === 1) handleSuccess(message);
    else if (messageType === 0) handleError(message);
    if (messageType !== null) dispatch(clearMessage());
  }, [message, messageType, dispatch]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-5 scroll-smooth relative">
      {loading && <Loader />}
      <div
        className={`w-[90%] grid lg:grid-cols-[30%_1fr] grid-cols-1 gap-10 ${
          showUpdateBox ? 'blur-sm' : ''
        }`}
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
            
            <div className="w-[90%] flex items-center justify-center border sm:py-2 py-1 rounded hover:border-3">
              <i className="fa-solid fa-share-nodes"></i>
              <p className="text-md font-medium">Share user profile</p>
            </div>
            <div className="flex items-center w-full justify-around">
              
              <p className="font-medium text-blue-600 cursor-pointer">Report user</p>
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
                <ProductCart key={j} showAction={true} showGrid={true}  product={item}/>

              ))}
              </>):("No ads Available")}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
