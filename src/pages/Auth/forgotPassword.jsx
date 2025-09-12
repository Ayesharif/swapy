import {React, useState}  from 'react'
import { useDispatch,useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
  const navigate = useNavigate();

    const [loginData, setloginData] = useState({ email: '', password: '' });

  const handleChange = e => {
    // setloginData({ ...loginData, [e.target.name]: e.target.value });

  };


  const handleSubmit = async e => {
    e.preventDefault();

        console.log('Login Data:', loginData);
    const { email, password } = loginData;
    // console.log(email);
    dispatch(loginUser(email, password, navigate));
    
    
    
  };

    return (
 <div className='h-[80vh] flex flex-col justify-center items-center '>
           <form autoComplete="off" className='md:w-[40%] w-[90%] flex flex-col gap-3 p-5 border-1 border-gray-300 hover:border-black  rounded shadow'>
          <p className="text-2xl text-center font-bold">Forgot Password </p>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Email" required />
          </div>

          <div className='flex items-center w-[100%] flex-col '>
            <button type="submit"
            onClick={()=>navigate('/otp')}
            className='border-1 w-[100%] rounded hover:bg-blue-950 hover:text-white py-1 cursor-pointer '>Forgot Password</button>
          </div>
        </form>    </div>
  )
}
