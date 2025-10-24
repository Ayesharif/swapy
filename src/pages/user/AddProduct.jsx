import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserCategories } from "../../features/action/productAction";
import { createProduct } from "../../features/action/userAction";
import { handleError, handleSuccess } from "../../component/common/tosters";
import { clearMessage } from "../../features/slices/userSlice";
import Loader from "../../component/common/loader";

export default function SellProduct() {
  const dispatch = useDispatch();

  const { message, messageType, loading } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.product);


  useEffect(() => {
    dispatch(getAllUserCategories());
  }, [dispatch]);


  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    productType: "",
    category: "",
  });


  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);


  const handleFieldChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...newPreviews]);

  };

  // ✅ Remove selected image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.title || !data.price || !data.category || images.length === 0) {
      handleError("Please fill all required fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    images.forEach((img) => formData.append("images", img));

    dispatch(createProduct(formData));
  };

  // ✅ Handle success/error messages
  useEffect(() => {
    if (messageType === 1) handleSuccess(message);
    else if (messageType === 0) handleError(message);

    if (messageType !== null) dispatch(clearMessage());
  }, [message, messageType, dispatch]);

  return (
    <div className="flex w-screen min-h-[100vh] items-center flex-col">
      {loading && <Loader />}

      <div className="md:w-[600px] w-[90%] py-10">
        <h2 className="text-2xl text-center font-bold mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">

          {/* Category */}
          <div>
            <label className="block mb-1">Product Category</label>
            <select
              name="category"
              onChange={handleFieldChange}
              className="w-full py-2 border rounded text-black"
            >
              <option value="">Select category</option>
              {categories && categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))
              ) : (
                <option disabled>No category available</option>
              )}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              name="title"
              type="text"
              value={data.title}
              onChange={handleFieldChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded text-black"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1">Description</label>
            <input
              name="description"
              type="text"
              value={data.description}
              onChange={handleFieldChange}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border rounded text-black"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={data.price}
              onChange={handleFieldChange}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded text-black"
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block mb-1">Condition</label>
            <select
              name="productType"
              onChange={handleFieldChange}
              className="w-full py-2 border rounded text-black"
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block mb-1">Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded text-black"
            />
          </div>

          {/* Preview Section */}
          {previews.length > 0 && (
            <div>
              <label className="block mb-1">Preview</label>
              <div className="flex flex-wrap gap-4">
                {previews.map((src, index) => (
                  <div
                    key={index}
                    className="w-[100px] h-[100px] relative border border-gray-300 rounded overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-950 text-white hover:bg-blue-800 font-semibold rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
