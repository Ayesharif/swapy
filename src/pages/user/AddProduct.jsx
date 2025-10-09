import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  getAllUserCategories } from '../../features/action/productAction';
import { createProduct } from '../../features/action/userAction';
import { handleError, handleSuccess } from '../../component/common/tosters';
import { clearMessage } from '../../features/slices/userSlice';
import Loader from '../../component/common/loader';


export default function SellProduct() {
const dispatch=useDispatch()

useEffect(()=>{
  dispatch(getAllUserCategories())
}, [dispatch])

const {message, messageType, loading}= useSelector((state)=>state.user)
const {categories,}= useSelector((state)=>state.product)


const [showImages, setShowImages] = useState({});

 const [data, setData]=useState({title:"", images:[]})

 const handelField=(e)=>{
  setData({ ...data, [e.target.name]: e.target.value });
 }
 console.log(data);
 

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // convert FileList to array
    const previews = files.map((file) => URL.createObjectURL(file));
    setShowImages(files);
    
  };
  const updateImages=(image)=>{
console.log(image);
// files.current.files.filter(img=>)
const preview = showImages.filter(item=>item !== image);
setShowImages(preview)
setData({...data, images:preview})
  }
const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("productType", data.productType);
  formData.append("category", data.category);

  // append images
  showImages.forEach((img) => {
    formData.append("images", img); // 👈 key must match Multer config
  });

  // now dispatch redux action with formData
  dispatch(createProduct(formData));
};

  useEffect(() => {
    if (messageType == 1) {
      handleSuccess(message)
    }
    else if (messageType == 0) {
      handleError(message)
    }
    if (messageType !== null) {
      dispatch(clearMessage()); // an action you create to reset {message, messageType}
    }
  }, [message, messageType, dispatch])



return (
<div className='flex w-screen min-h-[80vh] items-center flex-col'>
  {loading && <Loader/>}

      <div className={` md:w-[600px] w-[90%] `}>

        <h2 className="text-2xl text-center font-bold">Add Product</h2>

        <div className="flex flex-col gap-4">

                    <div>
            <label htmlFor="category" className="block mb-1">Product Category</label>
           <select className='w-full py-2 border rounded' name="category" id=""
           onChange={handelField}
           >
            <option  defaultChecked>Select category</option>
         {categories? categories.map((category, key)=>(

            <option key={key} value={category._id}>{category.category}</option>
            )):(
              <p>No any category</p>
            )
         }
           </select>
          </div>
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
            onChange={handelField}
              id="name"
              name="title"
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 rounded border text-black"
              />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <input
            onChange={handelField}
              id="description"
              name="description"
              type="text"
              placeholder="Enter product description"
              className="w-full px-4 py-2 rounded border text-black"
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-1">Price</label>
            <input
            onChange={handelField}
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              className="w-full px-4 py-2 rounded border text-black"
              />
          </div>
          <div>
            <label htmlFor="condition" className="block mb-1">Condition</label>
           <select
            className='w-full py-2 border rounded' name="productType" id=""
           onChange={handelField}
           >
            <option  defaultChecked>Select condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
           </select>
          </div>

          <div>
            <label htmlFor="image" className="block mb-1">Image</label>
            <input
              id="image"
              name="images"
              type="file"
              multiple
              onChange={handleImageChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 rounded border text-black"
              />
          </div>

{ showImages.length>0 && (
          <div>
 <label htmlFor="preview" className="block mb-1">Preview</label>
         <div className='flex flex-wrap gap-4'>
{
  showImages.map((image, key)=>(
<div key={key} className='w-[100px] h-[100px] flex items-center justify-center relative border border-gray-300 rounded'>
<img className='rounded w-[100px]' src={image} alt="" />
<i className='fa-solid fa-xmark text-xl top-0 right-0 text-red-600 absolute'
onClick={()=>updateImages(image.preview)}
></i>
</div>
))
}
         </div>
          </div>)
}
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2  hover:bg-blue-950 outline-1 hover:text-white font-bold rounded"
              >
              Add Product
            </button>
          </div>
        </div>
      </div>

                </div>

  )
}
