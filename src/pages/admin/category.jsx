import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getAllCategories, updatedCategory } from '../../features/action/adminAction';
import { handleError, handleLoading, handleSuccess } from '../../component/common/tosters';
import { data } from 'react-router-dom';
import { clearMessage } from '../../features/slices/adminSlice';
import Loader from '../../component/common/loader';


export default function Category() {
 const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllCategories())

  }, [])

  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [showAddCat, setShowAddCat] = useState(false);
  const [data, setData] = useState({});
  // const [editData, setEditData] = useState({});
  const [updatedata, setUpdateData] = useState();

const {categories, loading, message, messageType}  = useSelector((state)=>state.admin)  
//  console.log(cat);
 
// console.log(categories , message);

  const handelField = (e) => {
    if (e.target.type === "file") {
      setData({ ...data, [e.target.name]: e.target.files[0] }); // store file object
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

const handleSubmit =(e)=>{
 e.preventDefault();
     const formData = new FormData();
    formData.append("category", data.category);

    if (data.image) {
      formData.append("image", data.image);
      console.log("dsds",data.image);
       // single file
    }
 dispatch(addCategory(formData))

console.log(data);
}

const handleDelete = (e, id) => {
  e.preventDefault();
  if (window.confirm("Are you sure you want to delete this category?")) {
    dispatch(deleteCategory(id));

  }
};

const editData =(e, Data)=>{
 e.preventDefault();
 console.log(Data);
 
setData(Data)
setTimeout(() => {
  
  console.log(data);
  setShowUpdateBox(true)
}, 300);
}

// console.log(updatedata);
const handleUpdate = (e) => {
  e.preventDefault();
  if (!data?._id) {
    handleError("No category selected to update");
    return;
  }
  const formData = new FormData();
  formData.append("category", data.category);
  formData.append('imageId', data?.image?.publicId);
  
  if (data.newImage) {
    formData.append("image", data.newImage);
    console.log("dsds",data.newImage);
    // single file
  }
//   const payload = {
//     id: data.id,             
// form:formData
//   };

  // console.log("Updating with:", payload);
  dispatch(updatedCategory({
    id: data._id,             
form:formData
  }));
console.log(data);


  setShowUpdateBox(false);
  setData({});
};


useEffect(() => {
   if (messageType == 1) {
    handleSuccess(message);
  } 

   if (messageType == 0) {
    handleError(message);
  }
  
if(message!== null){
 dispatch(clearMessage())
}
  }, [message, messageType, clearMessage]);


  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      {loading && <Loader/>}
      <h2 className="text-2xl font-bold mb-6">Category List</h2>
<div className="flex  justify-end h-[100px] items-center">
  <button type="button" className="outline-1 outline-offset-2 p-2 px-3 font-bold rounded bg-blue-100" onClick={() => setShowAddCat(!showAddCat)}>
    Add Category
  </button>
</div>
      <div className={`overflow-x-auto
        ${showUpdateBox || showAddCat?"blur-sm":""}
        `} >
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden ">
          <thead className="bg-gray-800 text-white">
            <tr>

              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
              
            </tr>
          </thead>
          <tbody>
{categories.length > 0 ? (
  categories.map((category, key) => (
    <tr key={key} className="hover:bg-gray-100 transition">
      <td className="py-3 px-4">
        <img
          className="w-[100px]"
src={`${category.image.image}`}

          alt=""
        />
      </td>
      <td className="py-3 px-4">{category.category}</td>
      <td className="py-3 px-4 space-x-2">
        <button
          onClick={(e) => editData(e, category)}
          className="border-1 px-2 hover:bg-green-600 hover:text-white rounded hover:py-1"
        >
          Edit
        </button>
        <button
          type="submit"
          onClick={(e) => handleDelete(e, category._id)}
          className="border-1 px-2 hover:bg-red-600 hover:text-white rounded hover:py-1"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="3" className="text-center py-3 text-gray-500">
      No category available
    </td>
  </tr>
)}
            
          </tbody>
        </table>

      </div>



      <div 
  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[400px] w-[90%] p-6 bg-blue-50 rounded shadow transition-all duration-500 ease-in-out
    ${showUpdateBox ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
  `}
>
        <h4 className="text-xl font-semibold mb-4">Update category</h4>
        <i className="fa-solid fa-xmark text-3xl text-red-600 font-extrabold absolute right-5 top-5 border-2 border-black rounded p-1" 
onClick={() => setShowUpdateBox(false)}
></i>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <input
            onChange={handelField}
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="category Name"
              name='category'
              value={data.category}
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Image</label>
            <input
            onChange={handelField}
              type="file"
              className="w-full border px-3 py-2 rounded"
              name='newImage'
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            
            <button
            type='submit'
              onClick={(e)=>handleUpdate(e,data.id)}
              className="border-1 px-2 hover:bg-green-600 hover:text-white rounded hover:py-1"

            >
              Update category
            </button>
          </div>
        </form>
      </div>
            <div
  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[400px] w-[90%] p-6 bg-blue-50 rounded shadow transition-all duration-500 ease-in-out
    ${showAddCat ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
  `}
>
        <h4 className="text-xl font-semibold mb-4">Add Category</h4>
        <i className="fa-solid fa-xmark text-3xl text-red-600 font-extrabold absolute right-5 top-5 border-2 border-black rounded p-1" 
onClick={() => setShowAddCat(!showAddCat)}
></i>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
            onChange={handelField}
              type="text"
              name='category'
              className="w-full border px-3 py-2 rounded"
              placeholder="category Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Image</label>
            <input
            onChange={handelField}
              type="file"
              className="w-full border px-3 py-2 rounded"
              
              name='image'
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            
            <button
              type="submit"
onClick={handleSubmit}
              className="border-1 px-2 hover:bg-green-600 hover:text-white rounded hover:py-1"
            >
              Add category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
