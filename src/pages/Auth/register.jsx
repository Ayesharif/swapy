import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../features/action/authAction';

import { handleError, handleSuccess } from '../../component/common/tosters';
import Loader from '../../component/common/loader';



const Register = () => {

   const {loading, message, messageType, }=useSelector((state)=>state.auth)

  const [formData, setFormData] = useState();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
// console.log(formData);
const navigate= useNavigate();
const dispatch= useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    // console.log(formData);
    dispatch(RegisterUser(formData))
         .unwrap()
         .then((res) => {
           // console.log("Profile data:", res)
           if (res.message) {
            //  dispatch(setMessage({ message: res.message, messageType: res.status }))
         
            // console.log("message",res.message);
          // console.log("status",res.status);
          // console.log("Data",res.data);
         const message=  res.message;
         const messageType=  res.status;
         const currentUser=  res.data;
          if (messageType == 1 && currentUser?.role === "user") {
        setTimeout(() => {
          handleSuccess(message);
          navigate('/profile');
        }, );
      } 
      else if (messageType == 1) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login');
        }, );
      }
    
      if (messageType == 0) {
        handleError(message);
      }  
        }
         })
             .catch((err) => {
              if(err.message){
                handleError(err.message);

              }
               console.error("Error fetching profile:", err.message)
             })
  
  };

// useEffect(() => {
//     if (messageType==1) {
//       handleSuccess(message);
//       // navigate("/");
//        // redirect after login if you want
//     }
//     if (messageType==0) {
//       handleError(message);
//     }
//   }, [message, messageType]);      

  return (
<div className=' flex flex-col justify-center items-center py-10 '>
{loading&& <Loader/>}


           <form autoComplete="off" className='md:w-[50%] w-[90%] flex flex-col gap-5  p-5 border-1 border-gray-300 hover:border-black   rounded shadow'>
          <p className="text-2xl text-center font-bold">User Registeration </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="">First Name</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your First Name"  onChange={handleChange} name='firstName' required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Last Name</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Last Name"  onChange={handleChange} name='lastName' required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">City</label>
  <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your City"  onChange={handleChange} name='city' required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Phone</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your phone number"  onChange={handleChange} name='phone' required />
          </div>
          
                    <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Email"  onChange={handleChange} name='email' required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
  <input type="password" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Password"  onChange={handleChange} name='password' required />
          </div>
          <div className='flex items-center w-[100%] flex-col py-5'>
            <button type="submit" className='border-1 w-[100%] rounded hover:bg-blue-950 hover:text-white py-1 cursor-pointer '  onClick={handleSubmit}>Register</button>
          </div>
                    <Link to={'/login'} className='text-green-600 underline' >Login?</Link>
        </form>    </div>
  );
};

export default Register;
