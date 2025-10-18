import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserDropdown({ handleLogout ,currentUser}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  // const { currentUser, products, message, messageType, loading } = useSelector(
  //   (state) => state.user
  // );
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
    <div className="md:px-0 px-6 relative flex items-center gap-2" ref={dropdownRef}>
      {/* Icons */}
      <i className="fa-regular fa-user text-2xl cursor-pointer" onClick={() => setOpen(!open)}></i>
      <i
        className={`fa-solid ${open ? 'fa-angle-up' : 'fa-angle-down'} text-2xl cursor-pointer`}
        onClick={() => setOpen(!open)}
      ></i>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full right-0 bg-white border shadow-md rounded-lg sm:w-[300px] w-[250px] z-[10000]">
          <div className='flex items-center pl-4 pt-5 gap-5'>
            <img src={currentUser.image.image}
            className='w-[100px] rounded-full'
            alt="" />
            <p className='font-bold'>{`${currentUser.firstName} ${currentUser.lastName}`}</p>

            {/* <i className='fa-solid fa-pen  outline-2 outline-offset-5 rounded-full absolute left-[35%] top-[10%] text-green-600 '></i> */}
          </div>
          <ul className="py-2 text-gray-700">
            <li>
              <Link
                to={`/public-profile/${currentUser._id}`}
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/myAds"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => setOpen(false)}
              >
                My Ads
              </Link>
            </li>
            <li>
              <Link
                to="/manage-profile"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => setOpen(false)}
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
