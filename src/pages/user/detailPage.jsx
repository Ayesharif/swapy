import React, { useEffect, useRef, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailProducts } from '../../features/action/productAction';
import { handleError, handleSuccess } from '../../component/common/tosters';
import { clearMessage } from '../../features/slices/productSlice';
import Loader from '../../component/common/loader';


export default function DetailPage() {
    const [image, setImage] = useState("")
    
    const [number, setnumber] = useState("Show phone number")
   const { currentUser } = useSelector((state) => state.auth)

    const { id } = useParams();
// console.log(id);

    const dispatch= useDispatch();
    const navigate = useNavigate();

useEffect(()=>{
    dispatch(getDetailProducts(id))
},[])

      const { currentProduct, message, messageType, loading } = useSelector((state) => state.product)
    const product = currentProduct?.product
    const user = currentProduct?.userData;
    // console.log(product);
      const [selectedImage, setSelectedImage] = useState(product?.images[0]);
    
   const handleNumber=()=>{
       if(currentUser?.email){
    setnumber(user?.user?.phone);
    // console.log("user", currentUser);
}else{
    navigate('/login')
}
    }
    // const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [showQuantity, setShowQuantity] = useState(1);
    // const ratings = product.rating.toFixed();
    // const imageCount = product.images.length;
    const [currentIndex, setCurrentIndex] = useState(0);
const imageCount = product?.images?.length || 0;

// console.log("image",imageCount);


    const handleLeft = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? imageCount - 1 : prev - 1
        );
    };

    const handleRight = () => {
        setCurrentIndex((prev) =>
            prev === imageCount - 1 ? 0 : prev + 1
        );
    }

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
        <div className='w-screen h-full  flex flex-col items-center py-5 relative'>
              {loading && <Loader/>}
            <div className='w-[98%] lg:w-[90%] md:w-[95%] flex md:flex-row   '>
                <div className='w-screen h-full  grid lg:grid-cols-[60%_1fr] md:grid-cols-[70%_1fr] items-start gap-2 py-5'>

                    <div className='w-[100%]  overflow-clip  flex flex-col'>
    <div className="w-full relative overflow-hidden rounded-2xl">
  
  <div
    className="flex transition-transform duration-500 ease-in-out"
    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
  >
    {product?.images?.map((image, key) => (
      <div key={key} className="w-full flex-shrink-0">
        <img
          src={image.imageUrl}
          alt=""
          className="w-full h-[500px] object-cover cursor-pointer"
onMouseOver={() => {
  if (image !== image.imageUrl) setImage(image.imageUrl);
}}
          onMouseLeave={()=>setImage("")}
        />
      </div>
    ))}
  </div>

  {/* Hovered Image Preview */}
  

  {/* Navigation Arrows */}
  <i
    onClick={handleLeft}
    className="text-2xl top-1/2 left-2 absolute bg-blue-50 p-2 rounded-full cursor-pointer fa-solid fa-angle-left"
  ></i>

  <i
    onClick={handleRight}
    className="text-2xl top-1/2 right-2 absolute bg-blue-50 p-2 rounded-full cursor-pointer fa-solid fa-angle-right"
  ></i>
{image && (
  <img
    src={image}
    alt="Hovered"
    className="fixed top-[20%] right-[10%] w-[350px] h-[350px] object-cover rounded-md border-2 border-white shadow-lg z-50"
  />
)}

</div>


                         {/* <div className='flex flex-col w-[100%] sm:w-[80%] gap-5'>
          <div> <img

            className='rounded '
            src={selectedImage.imageUrl} alt="" /></div>
          <div className='flex flex-row gap-5 '>
            {product?.images.map((item, index) => (


              <img key={index} src={item.imageUrl}
                className={`
                w-[20%]  outline-2  outline-offset-2
               ${selectedImage === item ? "outline-red-500" : "outline-black"}
                `}
                onClick={() => { setSelectedImage(item) }}
                alt="" />
            ))}
          </div>
        </div> */}
                        <div className='pl-2 flex flex-col gap-2 py-5'>
                            <div className=' flex flex-col gap-2 py-5'>
                                <p className='text-3xl font-bold'>Rs {product?.price}</p>
                                <p className='text-lg font-medium '>{product?.title}</p>
                                <p className='text-md  '> <i className='fa-solid fa-location-dot'></i>{user?.user?.city} </p>

                            </div>
                            <div className='flex flex-col gap-3'>
                                <p className='text-xl font-bold'>Decription</p>
                                <p className='text-lg font-light '>{product?.description}</p>
                            </div>
                        </div>

                    </div>

                    <div className=' flex flex-col gap-7 '>
                        <div className="flex flex-col border border-gray-300 rounded items-center w-[100%] justify-between p-2 ">
                            <div className="flex items-center w-[100%] justify-between  py-3"
                            onClick={() => navigate(`/public-profile/${product?.postedBy}`)}
                            >
                                <div className="flex items-center gap-5">
                                    <i className="fa-solid fa-user text-4xl"></i>
                                    <div>
                                        <p className="text-sm">Posted by</p>
                                        <p className="text-md font-bold">{`${user?.user?.firstName} ${user?.user?.lastName}`}</p>
                                    </div>
                                </div>
                                <div>
                                    <i
                                        className="fa-solid fa-angle-right text-lg cursor-pointer"
                                        
                                    ></i>
                                </div>
                            </div>
                            <div className='w-full h-[1px] bg-black'></div>
                            <div className="flex items-center w-[100%] justify-between py-3 ">
                                <div className=" w-[50%] flex items-center gap-5">
                                    <i className="fa-solid fa-calendar-days text-xl"></i>
                                    <div>
                                        <p className="text-sm">Member Since</p>
                                        <p className="text-md font-bold">{user?.user?.createdAt}</p>
                                    </div>
                                </div>

                                <div className=" w-[50%] flex items-center gap-5">
                                    <i className="fa-solid fa-rectangle-ad text-xl"></i>
                                    <div>
                                        <p className="text-sm">Active Ads</p>
                                        <p className="text-md font-bold">{user?.products}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
<div className='w-full bg-white  md:bg-transparent h-20'>
<div className='w-full bg-white  md:bg-transparent bottom-0 flex md:flex-col py-5 gap-2 p-0 justify-center md:static fixed'>
                    <button className='md:w-[100%] w-[45%] text-white bg-blue-950 text-lg font-medium py-1 rounded-lg'
                    onClick={handleNumber}
                    >
                            <i className='fa-solid fa-phone'></i> {number} </button>
                        <button className='md:w-[100%] w-[45%] text-blue-950 border-2 hover:border-3 border-blue-950 text-lg font-medium py-1 rounded-lg'
                        onClick={()=> navigate('/chats')}
                        >
                            <i className='fa-solid fa-comment'></i> Chat </button>
</div>
</div>
                    </div>
                </div>


                {/* <div className='flex sm:flex-row flex-col w-[90%] sm:gap-5 gap-10 py-5  justify-around'>
        <div className='flex flex-col w-[100%] sm:w-[50%] gap-5'>
          <div> <img

            className='rounded '
            src={selectedImage} alt="" /></div>
          <div className='flex flex-row gap-5 '>
            {product.images.map((item, index) => (


              <img key={index} src={item}
                className={`
                w-[20%]  outline-2  outline-offset-2
               ${selectedImage === item ? "outline-red-500" : "outline-black"}
                `}
                onClick={() => { setSelectedImage(item) }}
                alt="" />
            ))}
          </div>
        </div>

        <div className='sm:w-[30%] w-[100%] flex flex-col gap-5'>
          <p className='text-xl font-medium'>{product.name}</p>
          <p className=' text-lg font-medium'>{product.price}</p>
          <p className='text-md font-light '>{product.description}</p>
          

          <button className='w-[95%] outline-1 rounded hover:bg-blue-950 hover:text-white py-2 cursor-pointer'
          onClick={()=>{navigate('/chats')}}
          >Chats</button>
        </div>
      </div> */}

            </div>
        </div>
    )
}
