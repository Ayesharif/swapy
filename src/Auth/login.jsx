import {React, useState}  from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from '../Redux/action/authAction';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const auth = useSelector(state => state.auth);

    const [loginData, setloginData] = useState({ email: '', password: '' });

  const handleChange = e => {
    // setloginData({ ...loginData, [e.target.name]: e.target.value });

  };
console.log(loginData);

  const handleSubmit = async e => {
    e.preventDefault();

        console.log('Login Data:', loginData);
    const { email, password } = loginData;
    // console.log(email);
    dispatch(loginUser(email, password, navigate));
    
    
    
  };
  console.log(auth);


    return (
 <div className='h-[80vh] flex flex-col justify-center items-center '>
           <form autoComplete="off" className='md:w-[40%] w-[90%] flex flex-col gap-2 p-5 border-1 border-gray-300 hover:border-black  rounded shadow'>
          <p className="text-2xl text-center font-bold">User Login </p>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Email" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
  <input type="password" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Password" required />
          </div>
          <div className='flex items-center w-[100%] flex-col py-5'>
            <button type="submit" className='border-1 w-[100%] rounded hover:bg-blue-950 hover:text-white py-1 cursor-pointer '>Submit</button>
          </div>
          <Link to={'/forgotpassword'} className='text-red-600 underline' >Forgot your password</Link>
        </form>    </div>
  )
}
