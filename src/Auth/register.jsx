import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
// import { registerUser } from '../../redux/actions/authAction';
import { Link, useNavigate } from 'react-router-dom';
// import { registerUser } from '../Redux/action/authAction'


const Register = () => {

  const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', city:'', role: 'user' });

  const handleChange = e => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });

  };
console.log(formData);
const navigate= useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const { name, email, password } = formData;
    console.log(formData);
    dispatch(registerUser(formData, navigate))
    


  };

  return (
<div className=' flex flex-col justify-center items-center py-10 '>
           <form autoComplete="off" className='md:w-[50%] w-[90%] flex flex-col gap-5  p-5 border-1 border-gray-300 hover:border-black   rounded shadow'>
          <p className="text-2xl text-center font-bold">User Registeration </p>
          <div className="flex flex-col gap-2">
            <label htmlFor="">First Name</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your First Name" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Last Name</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Last Name" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Email" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">City</label>
  <input type="text" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your City" required />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
  <input type="password" className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Password" required />
          </div>
          <div className='flex items-center w-[100%] flex-col py-5'>
            <button type="submit" className='border-1 w-[100%] rounded hover:bg-blue-950 hover:text-white py-1 cursor-pointer '>Register</button>
          </div>
                    <Link to={'/login'} className='text-green-600 underline' >Login?</Link>
        </form>    </div>
  );
};

export default Register;
