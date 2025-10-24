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
import {  getAllUserCategories, getPublicProfile } from '../../features/action/productAction';
import Loader from '../../component/common/loader';

export default function ManageProfile() {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getprofile());
    dispatch(getAllUserCategories());
    

  }, [dispatch]);

  const { currentUser, products, message, messageType, loading } = useSelector(
    (state) => state.user
  );
  const { categories } = useSelector((state) => state.product);

  const [showImages, setShowImages] = useState({});
  const [data, setData] = useState({});


useEffect(()=>{
    setData(currentUser)
},[currentUser])

  const handelField = (e) => {
    if (e.target.type === 'file') {
      console.log("file");
      
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
console.log(data);

  const handleUpdate = (e) => {
    console.log(data);
    
    e.preventDefault();
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('city', data.city);
    formData.append('phone', data.phone);
    formData.append('imageId', currentUser.image?.publicId);

    if (data.images) {
      formData.append('images', data.images);
    }

    dispatch(updateProfile(formData));
   
   
  };


  useEffect(() => {
    if (messageType === 1) handleSuccess(message);
    else if (messageType === 0) handleError(message);
    if (messageType !== null) dispatch(clearMessage());
  }, [message, messageType, dispatch]);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center py-5 ">
      {loading && <Loader />}
      
     

      

      <div
        className={`flex flex-col  sm:w-[70%] w-[90%] p-6 bg-blue-50 rounded shadow `}
      >
        <h4 className="text-xl font-semibold mb-4">Update Profile</h4>
        
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">First Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="First Name"
              name="firstName"
              value={data?.firstName || ''}
              onChange={handelField}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Last Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Last Name"
              name="lastName"
              value={data?.lastName || ''}
              onChange={handelField}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Email"
              name="email"
              value={data?.email || ''}
              onChange={handelField}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">City</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="city"
              name="city"
              value={data?.city || ''}
              onChange={handelField}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="tel"
              className="w-full border px-3 py-2 rounded"
              placeholder="+923..."
              name="phone"
              value={data?.phone || ''}
              onChange={handelField}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Profile Image</label>
            <input
              type="file"
              className="w-full border px-3 py-2 rounded"
              name="images"
              onChange={handelField}
            />
          </div>

          <div className="flex  justify-end gap-2 pt-4">
            <button
              type="button"
              className="border-1 px-2 w-[100%] hover:bg-green-600 hover:text-white rounded hover:py-1"
              onClick={handleUpdate}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
