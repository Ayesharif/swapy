import React, { useState } from 'react'
const Categories = [
  { id: 'CAT001', name: 'Bags' },
  { id: 'CAT002', name: 'Wallets' },
  { id: 'CAT003', name: 'Accessories' },
  { id: 'CAT004', name: 'Pearl Collection' },
  { id: 'CAT005', name: 'Crystal Collection' },
  { id: 'CAT006', name: 'Gift Sets' },
  { id: 'CAT007', name: 'Clutches' }
];

export default function Category() {
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [showAddCat, setShowAddCat] = useState(false);
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
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

              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Categories.map((category) => (
              <tr
                key={category.id}
                className=" hover:bg-gray-100 transition"
              >

                <td className="py-3 px-4">{category.name}</td>

                <td className="py-3 px-4 space-x-2">
                  <button onClick={() => setShowUpdateBox(!showUpdateBox)} className="border-1 px-2 hover:bg-green-600 hover:text-white rounded hover:py-1">
                    Edit
                  </button>
                  <button className="border-1 px-2 hover:bg-red-600 hover:text-white rounded hover:py-1">
                    Delete
                  </button>
                </td>
              </tr>
              
            ))}
            
          </tbody>
        </table>
      </div>

      {/* Dummy Modal UI */}
      <div
  className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[400px] w-[90%] p-6 bg-blue-50 rounded shadow transition-all duration-500 ease-in-out
    ${showUpdateBox ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
  `}
>
        <h4 className="text-xl font-semibold mb-4">Update category</h4>
        <i className="fa-solid fa-xmark text-3xl text-red-600 font-extrabold absolute right-5 top-5 border-2 border-black rounded p-1" 
onClick={() => setShowUpdateBox(!showUpdateBox)}
></i>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="category Name"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            
            <button
              type="button"
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
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="category Name"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            
            <button
              type="button"
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
