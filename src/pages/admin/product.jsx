import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, updateProductStatus } from "../../features/action/adminAction";
import { handleError, handleSuccess } from "../../component/common/tosters";
import { useNavigate } from "react-router-dom";
import { clearMessage } from "../../features/slices/adminSlice";
import Loader from "../../component/common/loader";

const ManageProducts = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const { products, message, messageType, loading } = useSelector((state) => state.admin)
  const prod = useSelector((state) => state.admin)
  // console.log(prod);
  
  // console.log(message, messageType);


  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [showAddProductBox, setShowAddProductBox] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});



  useEffect(() => {
    
    if (messageType == 1) {
      handleSuccess(message);
    }
    if (messageType == 0) {
      // console.log(message);
      handleError(message);
    }
if(message!== null){
 dispatch(clearMessage())
}
  }, [message, messageType, clearMessage]);


  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative ">
{loading && <Loader/>}

      <h2 className="text-2xl font-bold mb-6">Product List</h2>
    
      <div className={`overflow-x-auto
        ${showUpdateBox || showAddProductBox ? "blur-sm" : ""}
        `} >
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden ">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">View</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && loading ? (

          <Loader/>
            ) : (

              products.map((product, key) => (


                <tr
                  key={key}
                  className=" hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">
                    {product.images ? (
                      <img
src={`${product.images[0].imageUrl}`}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded border"
                      />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{product.title}</td>
                  <td className="py-3 px-4">{product.description}</td>
                  <td className="py-3 px-4">Rs. {product.price}</td>
                  <td className="py-3 px-2 ">
                    <i className="fa-solid fa-link cursor-pointer text-lg" 
                    onClick={()=> navigate(`/detailpage/${product._id}`)}
                    ></i>
                    </td>

                  <td className="py-3 px-4 space-x-2">

                    <button
                      onClick={(e)=> { e.preventDefault(),
                         dispatch(updateProductStatus(product._id))}}
                      className={`border-1 px-2  hover:text-white rounded hover:py-1
                  ${product.status==true ?"hover:bg-red-600":"hover:bg-green-500"}
                  `}>
                      {product.status == true ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>



              ))

            )
            }
          </tbody>
        </table>
      </div>


      <div
  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[400px] w-[90%] p-6 bg-blue-50 rounded shadow transition-all duration-500 ease-in-out
    ${showUpdateBox ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
  `}
>
        <h4 className="text-xl font-semibold mb-4">Update Product</h4>
        <i className="fa-solid fa-xmark text-3xl text-red-600 font-extrabold absolute right-5 top-5 border-2 border-black rounded p-1" 
onClick={() => setShowUpdateBox(!showUpdateBox)}
></i>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Product Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="Product Description"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              placeholder="Price"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Images</label>
            <input
              type="file"
              multiple
              className="w-full border px-3 py-2 rounded"
              placeholder="Image URL"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            
            <button
              type="button"
              className="border-1 px-2 hover:bg-green-600 hover:text-white rounded hover:py-1"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>

      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[500px] w-[90%] p-6 bg-blue-50 rounded shadow transition-all duration-500 ease-in-out
    ${showAddProductBox ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
  `}>

        <h2 className="text-2xl font-semibold text-center">Add Product</h2>
        <i className="fa-solid fa-xmark text-3xl text-red-600 font-extrabold absolute right-5 top-5 border-2 border-black rounded p-1"
          onClick={() => setShowAddProductBox(!showAddProductBox)}
        ></i>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 rounded border text-black"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-1">Description</label>
            <input
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
              id="price"
              name="price"
              type="number"
              placeholder="Enter price"
              className="w-full px-4 py-2 rounded border text-black"
            />
          </div>

          <div>
            <label htmlFor="image" className="block mb-1">Images</label>
            <input
              id="image"
              name="image"
              type="file"
              multiple
              placeholder="Enter image URL"
              className="w-full px-4 py-2 rounded border text-black"
            />
          </div>

          <div>
            <button
              type="button"
              className="w-full py-2  hover:bg-orange-700 outline-1 hover:text-white font-bold rounded"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ManageProducts;
