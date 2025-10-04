import {React, useEffect, useState}  from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../features/action/authAction';
import {handleError, handleSuccess} from '../../component/common/tosters'
import Loader from '../../component/common/loader';
import { clearMessage, setMessage } from '../../features/slices/authSlice';


export default function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {loading, currentUser, message, messageType }=useSelector((state)=>state.auth)

    const [loginData, setloginData] = useState({email:"", password:""});
    

  const handleChange = e => {
    
    setloginData({ ...loginData, [e.target.name]: e.target.value });

  };
console.log(loginData);

  const handleSubmit = async (e) => {
    e.preventDefault();
        const emailFormat = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const {email, password}=loginData
        console.log('Login Data:', loginData);
 if(!email || !password){
  handleError("Please fill all fields")
 }
  if (!emailFormat.test(email)) {
    handleError("Please enter a valid email address!");
    return;
  }
  
  
// const result=  dispatch(login(loginData));
 dispatch(login(loginData))
  //    .unwrap()
  //    .then((res) => {
  //      console.log("Profile data:", res)
  //      if (res.message) {
  //       //  dispatch(setMessage({ message: res.message, messageType: res.status }))
     
  //       console.log("message",res.message);
  //     console.log("status",res.status);
  //     console.log("Data",res.data);
  //    const message=  res.message;
  //    const messageType=  res.status;
  //    const currentUser=  res.data;
  //     if (messageType == 1 && currentUser?.role === "user") {
  //   setTimeout(() => {
  //     handleSuccess(message);
  //     navigate('/profile');
  //   }, );
  // } 
  // else if (messageType == 1 && currentUser?.role === "admin") {
  //   handleSuccess(message);
  //   setTimeout(() => {
  //     navigate('/admin');
  //   }, );
  // }

  // if (messageType == 0) {
  //   handleError(message);
  // }  
  //   }
  //    })
  //    .catch((err) => {
  //      console.error("Error fetching profile:", err)
  //          handleError(err);
  //    })
// console.log(result.payload);

};

    
useEffect(() => {
 
  if (messageType == 1 && currentUser?.role === "user") {
    handleSuccess(message);
    setTimeout(() => {
      navigate('/profile');
    }, 1000 );
  } 
  else if (messageType == 1 && currentUser?.role === "admin") {
    handleSuccess(message);
    setTimeout(() => {
      navigate('/admin');
    }, 1000);
  }

  if (messageType == 0) {
    handleError(message);
  }
    if (messageType !== null) {
      dispatch(clearMessage()); // an action you create to reset {message, messageType}
    }
}, [message, messageType,loading, currentUser, navigate]);



    return (
      <div className='h-[80vh] flex flex-col justify-center items-center '>
      {loading &&  <Loader/>}

           <form autoComplete="off" className='md:w-[40%] w-[90%] flex flex-col gap-2 p-5 border-1 border-gray-300 hover:border-black  rounded shadow'>
          <p className="text-2xl text-center font-bold">User Login </p>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input type="text"
            name='email'
            onChange={handleChange}
            className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Email" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
  <input type="password"
  name='password'
  onChange={handleChange}
  className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Password" required />
          </div>
          <div className='flex items-center w-[100%] flex-col py-5'>
            <button type="submit" onClick={handleSubmit} className='border-1 w-[100%] rounded hover:bg-blue-950 hover:text-white py-1 cursor-pointer '>Submit</button>
          </div>
          <Link to={'/forgotpassword'} className='text-red-600 underline' >Forgot your password</Link>
        </form>  
        
        </div>
  )
}
