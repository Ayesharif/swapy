import {React, useEffect, useState}  from 'react'
import { useDispatch,useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../features/action/authAction';
import { handleError, handleSuccess } from '../../component/common/tosters';
import Loader from '../../component/common/loader';
import { clearMessage } from '../../features/slices/authSlice';


export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const [loginData, setloginData] = useState({ email: '', password: '' });
    const {message, messageType, currentUser, loading}=useSelector((state)=>state.auth);

  const handleChange = e => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });

  };


  const handleSubmit = async e => {
    e.preventDefault();

        console.log('Login Data:', loginData);
    const { email } = loginData;
    // console.log(email);
    dispatch(forgotPassword(email))    
    //  .unwrap()
//          .then((res) => {
//            console.log("Profile data:", res)
//            if (res.message) {
//             //  dispatch(setMessage({ message: res.message, messageType: res.status }))
         
//             console.log("message",res.message);
//           console.log("status",res.status);
//           console.log("Data",res.data);
//          const message=  res.message;
//          const messageType=  res.status;
//          const email=  res?.email;

//        if(messageType==1){
//   handleSuccess(message) 
//   setTimeout(() => {
//     navigate(`/otp/${email}`)
//   }, 3000);
// }else if(messageType == 0){
//   handleError(message) 

// } 
//         }
//          })
//              .catch((err) => {
//               if(err.message){
//                 handleError(err.message);

//               }
//                console.error("Error fetching profile:", err.message)
//              })
    
  };
    useEffect(()=>{

if(messageType==1){
  handleSuccess(message) 
  setTimeout(() => {
 navigate(`/otp/${currentUser.email}`)
  }, 2000);
}else if(messageType==0){
  handleError(message) 
}
if(message!== null){
  dispatch(clearMessage())
}
    },[message, messageType, navigate, clearMessage])
    

    return (
 <div className='h-[80vh] flex flex-col justify-center items-center '>
  {loading && <Loader/>}
           <form autoComplete="off" className='md:w-[40%] w-[90%] flex flex-col gap-3 p-5 border-1 border-gray-300 hover:border-black  rounded shadow'>
          <p className="text-2xl text-center font-bold">Forgot Password </p>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input type="text" onChange={handleChange} name='email' className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Email" required />
          </div>

          <div className='flex items-center w-[100%] flex-col '>
            <button type="submit"
            onClick={handleSubmit}
            className='border-1 w-[100%] rounded hover:bg-blue-950 hover:text-white py-1 cursor-pointer '>Forgot Password</button>
          </div>
        </form>    </div>
  )
}
