// import React from 'react'
// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useNavigate } from "react-router-dom";

// const ProtectedRoute=({allowedRoles})=> {
//   const {IsLogin,currentUser}=useSelector(state=>state.auth);
//   console.log(IsLogin, currentUser.role);
//   if(!IsLogin){
//     return <Navigate to="/login" replace />;
//   }
//   console.log(allowedRoles);
  
//   if (currentUser && allowedRoles && !allowedRoles.includes(currentUser.role)) {
//     // Redirect based on role
//     return <Navigate to={currentUser.role === 'admin' ? "/admin":"/"} replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../features/action/authAction";


export default function ProtectedRoute({children}){
    const {loading, IsLogin} = useSelector((state)=>state.auth)
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

console.log(IsLogin);



    useEffect( ()=>{
dispatch(checkUser())
        if(loading) return <Loader/>
        if(!IsLogin){
            return navigate('/login')
        }
    },[])

    return children;
}