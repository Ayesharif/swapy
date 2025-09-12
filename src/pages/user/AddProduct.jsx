import React, { useRef, useState } from 'react'

export default function SellProduct() {
 const [showImages, setShowImages] = useState({});

 
 console.log(showImages);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // convert FileList to array
    const previews = files.map((file) => URL.createObjectURL(file));
    setShowImages(previews);
  };
  const updateImages=(image)=>{
console.log(image);
// files.current.files.filter(img=>)
const preview = showImages.filter(item=>item !== image);
setShowImages(preview)
  }
return (
<div className='flex w-screen min-h-[80vh] items-center flex-col'>

      <div className={` md:w-[600px] w-[90%] `}>

        <h2 className="text-2xl text-center font-bold">Add Product</h2>

        <div className="flex flex-col gap-4">

                    <div>
            <label htmlFor="category" className="block mb-1">Product Category</label>
           <select className='w-full py-2 border rounded' name="" id="">
            <option  defaultChecked>Select category</option>
            <option value="new">New</option>
            <option value="used">Used</option>
           </select>
          </div>
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
            <label htmlFor="condition" className="block mb-1">Condition</label>
           <select className='w-full py-2 border rounded' name="" id="">
            <option  defaultChecked>Select condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
           </select>
          </div>

          <div>
            <label htmlFor="image" className="block mb-1">Image</label>
            <input
              id="image"
              name="image"
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
onClick={()=>updateImages(image)}
></i>
</div>
))
}
         </div>
          </div>)
}
          <div>
            <button
              type="button"
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
