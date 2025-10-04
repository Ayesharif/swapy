import React, { useEffect, useState } from 'react'
import { handleError, handleLoading, handleSuccess } from '../../component/common/tosters';
import { getAllUsers, updateUserStatus } from '../../features/action/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../../features/slices/adminSlice';
import Loader from '../../component/common/loader';


export default function User() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])


      const {message, messageType, users, loading}=useSelector((state)=>state.admin);
      
useEffect(()=>{
  if(messageType==1){
    handleSuccess(message)
  }
  else if(messageType==0){
    handleError(message)
  }
  if(message!== null){
   dispatch(clearMessage())
  }
    }, [message, messageType, clearMessage, dispatch]);
      return (
        <div className="max-w-7xl mx-auto px-4 py-6 relative">
          {loading && <Loader/>}
          <h2 className="text-2xl font-bold mb-6">User List</h2>
    
          <div className={`overflow-x-auto
           
            `} >
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden ">
              <thead className="bg-gray-800 text-white">
                <tr>

                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  {/* <th className="py-3 px-4 text-left">Status</th> */}
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, key) => (
                  <tr
                    key={key}
                    className=" hover:bg-gray-100 transition"
                  >

                    <td className="py-3 px-4">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>

                    <td className="py-3 px-4 space-x-2">
                                          <button
                                            onClick={(e)=> { e.preventDefault(),
                                               dispatch(updateUserStatus(user._id))}}
                                            className={`border-1 px-2  hover:text-white rounded hover:py-1
                                        ${user.status==true ?"hover:bg-green-500":"hover:bg-red-600"}
                                        `}>
                                            {user.status == "active" ? "Block" : "Active"}
                                          </button>

                    </td>
                  </tr>
                  
                ))}
                
              </tbody>
            </table>
          </div>
    

        </div>
      );
}
