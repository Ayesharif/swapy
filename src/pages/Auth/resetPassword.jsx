import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
// import { registerUser } from '../../redux/actions/authAction';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { reSetPassword } from '../../features/action/authAction';
import { handleError, handleSuccess } from '../../component/common/tosters';
import { clearMessage } from '../../features/slices/authSlice';
import Loader from '../../component/common/loader';
// import { registerUser } from '../Redux/action/authAction'


const ResetPassword = () => {

const { email, otp } = useParams();
console.log(email,otp);
      const {loading, message, messageType, currentUser}=useSelector((state)=>state.auth);
  const [formData, setFormData] = useState({  email: email,otp:otp, password: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };
console.log(formData);
const navigate= useNavigate();
const dispatch= useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    dispatch(reSetPassword(formData))
    
  };

  useEffect(()=>{
            if (messageType==1) {
    
          handleSuccess(message)
          setTimeout(() => {
            navigate(`/login`)
          }, 2000);
        }
        else if(messageType==0)
        {
          handleError(message)
        }
if(message!== null){
  dispatch(clearMessage())
}
    },[message, messageType, navigate, clearMessage])
    
  return (
<div className=' flex flex-col justify-center items-center py-10 '>
  {loading && <Loader/>}
           <form autoComplete="off" className='md:w-[50%] w-[90%] flex flex-col gap-5  p-5 border-1 border-gray-300 hover:border-black   rounded shadow'>
          <p className="text-2xl text-center font-bold">Reset Your Password</p> 
          <div className="flex flex-col gap-2">
            <label htmlFor="">Password</label>
  <input type="password" onChange={handleChange} name='password' className='outline-1  p-2 rounded focus:outline-black' placeholder="Your Password" required />
          </div>
          <div className='flex items-center w-[100%] flex-col py-5'>
            <button type="submit" onClick={handleSubmit} className='border-1 w-[100%] rounded hover:bg-blue-950 hover:text-white py-1 cursor-pointer '>Reset</button>
          </div>
                    <Link to={'/login'} className='text-green-600 underline' >Login?</Link>
        </form>    </div>
  );
};

export default ResetPassword;
