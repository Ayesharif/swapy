import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyFavourite } from '../../features/action/userAction';

export default function UserDropdown({ handleLogout ,currentUser, handleDropDown}) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getMyFavourite())
  },[dispatch])

  const { favourite , loading } = useSelector(
    (state) => state.user
  );
console.log(favourite);

  const count= favourite?.length
  // console.log(count);
  
  // console.log(currentUser.image.image);
  
  useEffect(() => {

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // const handleLogout = () => {
  //   dispatch(logout());                   // clear redux + localStorage
  //   handleSuccess("Logout Successfully"); // show toast after state clears
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 3000);
  // }

  return (
    <div className=" relative flex items-center gap-2 z-10  transition-all
         ease-in-out  duration-300 delay-100" ref={dropdownRef}>
      {/* Icons */}
      <div
      onClick={() => setOpen(!open)}
      className='md:w-max w-[100%] p-1 md:hover:bg-transparent md:hover:text-blue-950 hover:bg-blue-950 hover:text-white  transition-all
         ease-in-out  duration-300 delay-100'>

      <i className="fa-regular fa-user text-2xl cursor-pointer" onClick={() => setOpen(!open)}></i>
      <i
        className={`fa-solid ${open ? 'fa-angle-up' : 'fa-angle-down'} text-2xl cursor-pointer`}
        
        ></i>
        </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full right-0 bg-white border shadow-md rounded-lg sm:w-[300px] w-[250px] z-[10000]  transition-all
          ease-in-out  duration-300 delay-100">
          <div className='flex items-center pl-4 pt-5 gap-5'>
{
currentUser?.image? (
<img src={currentUser?.image?.image}
            className='w-[100px] rounded-full'
            alt="" />):
            (    <i className='fa-solid fa-user text-5xl text-blue-950 p-3'></i> )
            }
            <p className='font-bold'>{`${currentUser?.firstName} ${currentUser?.lastName}`}</p>

            {/* <i className='fa-solid fa-pen  outline-2 outline-offset-5 rounded-full absolute left-[35%] top-[10%] text-green-600 '></i> */}
          </div>
          <ul className="py-2 text-gray-700">
            <li>
              <Link
                to={`/public-profile/${currentUser?._id}`}
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => {setOpen(false); handleDropDown}}
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/myAds"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => {setOpen(false); handleDropDown}}
              >
                My Ads
              </Link>
            </li>
            <li className='relative'>
              <Link
                to="/myfavourite"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => {setOpen(false); handleDropDown}}
              >
                My Favourite
              </Link>
{ count>0 &&
              <div className=' text-center absolute top-[20%] right-2 outline-2 outline-red-600 text-red-600 w-6 rounded-full'>
                <p>{count}</p>
              </div>}
            </li>
            <li>
              <Link
                to="/manage-profile"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => {setOpen(false); handleDropDown}}
              >
                Manage Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-blue-100"
              >
                <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
