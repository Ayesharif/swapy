import React from 'react';

export default function AddProduct() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      <div className="bg-orange-50 text-dark rounded-lg p-8 shadow-lg flex flex-col gap-6">

        <h2 className="text-2xl font-semibold text-center">Add Product</h2>

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
            <label htmlFor="image" className="block mb-1">Image URL</label>
            <input
              id="image"
              name="image"
              type="text"
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
}
