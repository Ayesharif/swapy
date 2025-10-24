import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../../features/action/authAction";


export default function ProtectedRoute({children}){
    // const [loading, setLoading] = useState(true)
    // const [isAuth, setIsAuth] = useState(false)
    const dispatch=useDispatch();
    const{loading, IsLogin}= useSelector((state)=>state.auth)
    const navigate = useNavigate()
useEffect(()=>{
dispatch(checkUser())
},[dispatch])
    // const checkUser = async ()=>{
    //     console.log("here")
    //     const response = await fetch('http://localhost:3000/authMe', {
    //         method: "GET",
    //         credentials : 'include'
    //     })
    //     console.log(response, " response1")
    //     if(response.ok){
    //         console.log(response, "response2")
    //         setIsAuth(true)
    //         setLoading(false)
    //         return response
    //     }else{
    //         setLoading(false)
    //         return null
    //     }
    // }


    // useEffect( ()=>{
    //     checkUser()
    // },[])

    if(loading) return <Loader/>
    if(!IsLogin){
        return navigate('/login')
    }
    return children;
}