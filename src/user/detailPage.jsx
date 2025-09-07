import React, { useRef, useState } from 'react'
import { products } from '../products'
import { useNavigate, useParams } from 'react-router-dom';


export default function DetailPage() {
    const [count, setCount] = useState(0)
    const [width, setWidth] = useState(0)
    // const dispatch= useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [showQuantity, setShowQuantity] = useState(1);
    const ratings = product.rating.toFixed();
    const imageCount = product.images.length;
    const [currentIndex, setCurrentIndex] = useState(0);

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
    return (
        <div className='w-screen h-full  flex flex-col items-center py-5 relative'>
            <div className='w-[98%] lg:w-[90%] md:w-[95%] flex md:flex-row   '>
                <div className='w-screen h-full  grid lg:grid-cols-[60%_1fr] md:grid-cols-[70%_1fr] items-start gap-2 py-5'>

                    <div className='w-[100%]  overflow-clip  flex flex-col'>
                        <div className='w-[100%] rounded-2xl  overflow-clip  flex relative'>
                            {product.images.map((image, key) => (
                                <img
                                    className="flex transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    key={key} src={image} alt="" />
                            ))

                            }
                            <i
                                onClick={handleLeft}
                                className='text-2xl top-1/2 left-0 absolute bg-blue-50 p-2 rounded-[50%] fa-solid fa-angle-left' ></i>

                            <i
                                onClick={handleRight}
                                className='text-2xl top-1/2 right-0 absolute bg-blue-50 p-2 rounded-[50%] fa-solid fa-angle-right' ></i>
                        </div>
                        <div className='pl-2 flex flex-col gap-2 py-5'>
                            <div className=' flex flex-col gap-2 py-5'>
                                <p className='text-3xl font-bold'>Rs {product.price}</p>
                                <p className='text-lg font-medium '>{product.name}</p>
                                <p className='text-md  '> <i className='fa-solid fa-location-dot'></i>unit no 10 Latifabad Hyderabad </p>

                            </div>
                            <div className='flex flex-col gap-3'>
                                <p className='text-xl font-bold'>Decription</p>
                                <p className='text-lg font-light '>{product.description}</p>
                            </div>
                        </div>

                    </div>

                    <div className=' flex flex-col gap-7 '>
                        <div className="flex flex-col border border-gray-300 rounded items-center w-[100%] justify-between p-2 ">
                            <div className="flex items-center w-[100%] justify-between  py-3"
                            onClick={() => navigate('/profile')}
                            >
                                <div className="flex items-center gap-5">
                                    <i className="fa-solid fa-user text-4xl"></i>
                                    <div>
                                        <p className="text-sm">Posted by</p>
                                        <p className="text-md font-bold">Muhammad Ali</p>
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
                                        <p className="text-md font-bold">2025</p>
                                    </div>
                                </div>

                                <div className=" w-[50%] flex items-center gap-5">
                                    <i className="fa-solid fa-rectangle-ad text-xl"></i>
                                    <div>
                                        <p className="text-sm">Active Ads</p>
                                        <p className="text-md font-bold">5</p>
                                    </div>
                                </div>

                            </div>
                        </div>
<div className='w-full bg-white  md:bg-transparent h-20'>
<div className='w-full bg-white  md:bg-transparent bottom-0 flex md:flex-col py-5 gap-2 p-0 justify-center md:static fixed'>
                    <button className='md:w-[100%] w-[45%] text-white bg-blue-950 text-lg font-medium py-1 rounded-lg'
                    onClick={(e)=>e.target.value='03130306029'}
                    >
                            <i className='fa-solid fa-phone'></i> Show phone number </button>
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
