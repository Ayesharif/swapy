import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ProductCart({product, showAction, showGrid}) {
    
const navigate= useNavigate();
     const [gridview, setgridview] = useState(showGrid);
     const [Fav, setfav] = useState(false);
     const [showBox, setShowBox] = useState(false);
     const [actionBtn, setActionBnt] = useState(false);
     console.log("product");
     const{Islogin, currentUser}=useSelector((state)=>state.auth)
    
     
const handleCall=()=>{
if(Islogin){

}
}

     useEffect(()=>{

         if(showAction == false){
             setgridview(true)
            }
        },[])
  return (
<div
              

              className={`flex 
                ${showGrid==true?"flex-col max-w-[350px]":"flex-row "}
               min-w-[200px]  border-1 border-gray-400 rounded-lg bg-white shadow hover:shadow-md transition relative`}
            >
              <img
                src={`${product.images[0].imageUrl}`}
                alt={product.name}
                              onClick={()=> navigate(`/detailpage/${product._id}`)}
                className={`
                  ${showGrid==true?"w-full":"w-[40%] "}
                  h-70 object-cover rounded `}
              />
                <div className='flex flex-col h-full justify-between gap-3 py-2 relative w-[100%] '>
                <i  className={` absolute  text-2xl 
                ${Fav == true ?  "fa-solid fa-heart text-red-600":"fa-regular fa-heart"}
                ${showGrid==true && showAction==true? "right-5 top-5": "right-5 top-5" }
                `} 
                onClick={()=>setfav(!Fav)}
                ></i>
              
              <p className='px-2 text-xl font-medium'>RS {product.price}</p>
              <p className='px-2 mt-2 text-gray-800 '>{product.title}</p>
              <p className='px-2 text-sm text-gray-600'>{product.description}</p>
              <div className={`${actionBtn== showAction?"hidden":"flex"} 
                flex-col products-center gap-2  items-center`}>

              <button className='w-[90%] text-white bg-blue-950 border-1 lg:text-lg md:text-md text-sm  font-medium py-1 rounded-lg'
                    onClick={handleCall}
                    >
                            <i className='fa-solid fa-phone'></i> Call </button>
                        <button className='w-[90%]  text-blue-950 border-1 hover:border-3 border-blue-950 lg:text-lg md:text-md text-sm  font-medium py-1 rounded-lg'
                        onClick={()=> navigate('/chats')}
                        >
                            <i className='fa-solid fa-comment'></i> Chat </button>
                          </div>
              </div>
{/* 
              <div className='absolute w-[250px] h-[250px] bg-blue-50 flex flex-col items-center  justify-around'>
                <h1>Contact Me</h1>
               <h1>{`${currentUser.firstName} ${currentUser.lastName}`}</h1>
<h1>{currentUser.phone}</h1>
              </div> */}
            </div>
  )
}
