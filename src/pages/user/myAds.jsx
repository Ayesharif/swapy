import React, { useEffect, useState } from 'react';
import ProductCart from '../../component/user/ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyProducts,
  updateMyProduct,
  updateProfile,
} from '../../features/action/userAction';
import { handleError, handleSuccess } from '../../component/common/tosters';
import { clearMessage } from '../../features/slices/userSlice';
import {  getAllUserCategories, getPublicProfile } from '../../features/action/productAction';
import Loader from '../../component/common/loader';
import UserDropdown from '../../component/user/userDropDown';
import { useParams } from 'react-router-dom';

export default function MyAds() {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getMyProducts());
    dispatch(getAllUserCategories());
    

  }, [dispatch]);

  const { currentUser, products, message, messageType, loading } = useSelector(
    (state) => state.user
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
      
     

        {/* <div className={`flex flex-col w-full py-5 gap-10
               
          `}> */}


          <div className={`flex md:w-[80%] w-[100%] flex-col items-center justify-start gap-20 py-2
              ${showUpdateBox ? 'blur-sm' : ''}
            `}>
            <label htmlFor="ads" className="text-2xl font-bold">
              My Ads
            </label>
            <div className="w-[100%] flex flex-col  justify-center gap-3 place-content-center">
           
           {products.length>0? (<>
           
              {products.map((item, j) => (
         
                <div
                  className="w-[80%] flex flex-row  border-1 border-gray-400 rounded-lg bg-white shadow hover:shadow-md transition"
                  key={j}
                >
                  <img
                    src={`${item.images[0].imageUrl}`}
                    alt={item.name}
                    className="min-w-[100px] h-[200px] object-cover rounded"
                  />
                  <div className="w-full flex flex-col gap-3 py-2 relative">
                    
                    <p className="px-2 text-xl font-medium">RS {item.price}</p>
                    <p className="px-2 mt-2 text-gray-800">{item.title}</p>
                    <p className="px-2 text-sm text-gray-600">{item.description}</p>
                    <i
                      className="absolute bottom-1 right-1 text-2xl fa-solid fa-edit"
                      onClick={() => {
                        setData(item);
                        console.log(item);
                        
                        setShowProductBox(true);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
              </>):
              (<><h1>No ads available </h1></>)}
            </div>
          </div>
      

      {/* === UPDATE PRODUCT MODAL === */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[700px] h-[500px] overflow-y-scroll w-[90%] p-6 bg-blue-50 rounded shadow transition-all duration-500 ease-in-out ${
          showProductBox ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        } z-2`}
      >
        <h4 className="text-xl font-semibold mb-4">Update Product</h4>
        <i
          className="fa-solid fa-xmark text-3xl text-red-600 font-extrabold absolute right-5 top-5 border-2 border-black rounded p-1"
          onClick={() => setShowProductBox(false)}
        ></i>
        <form className="space-y-4">
          <div>
            <label htmlFor="category" className="block mb-1">
              Product Category
            </label>
            <select
              className="w-full py-2 border rounded"
              name="category"
              value={data?.category || ''}
              onChange={handelField}
            >
              <option value="">Select category</option>
              {categories && categories.length > 0 ? (
                categories.map((category, key) => (
                  <option key={key} value={category._id}>
                    {category.category}
                  </option>
                ))
              ) : (
                <option disabled>No category available</option>
              )}
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              id="name"
              name="title"
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 rounded border text-black"
              value={data?.title || ''}
              onChange={handelField}
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter product description"
              className="w-full px-4 py-2 rounded border text-black"
              value={data?.description || ''}
              onChange={handelField}
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-1">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              className="w-full px-4 py-2 rounded border text-black"
              value={data?.price || ''}
              onChange={handelField}
            />
          </div>

          <div>
            <label htmlFor="condition" className="block mb-1">
              Condition
            </label>
            <select
              className="w-full py-2 border rounded"
              name="productType"
              value={data?.productType || ''}
              onChange={handelField}
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div>
            <label htmlFor="image" className="block mb-1">
              Image
            </label>
            <input
              id="image"
              name="newImages"
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded border text-black"
            />
          </div>

          {data?.images?.length > 0 && (
            <div>
              <label htmlFor="preview" className="block mb-1">
                Preview
              </label>
              <div className="flex flex-wrap gap-4">
                {data.images.map((image, key) => {


                  return (
                    <div
                      key={key}
                      className="w-[100px] h-[100px] flex items-center justify-center relative border border-gray-300 rounded"
                    >
                      <img className="rounded w-[100px]" src={image.imageUrl} alt="preview" />
                      <i
                        className="fa-solid fa-xmark text-xl top-0 right-0 text-red-600 absolute cursor-pointer"
                        onClick={() => updateImages(image)}
                      ></i>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={updateProduct}
              className="border-1 px-2 hover:bg-green-600 hover:text-white rounded hover:py-1"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
