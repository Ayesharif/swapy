import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./loader";


export default function ProtectedRoute({children}){
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    const checkUser = async ()=>{
        console.log("here")
        const response = await fetch('https://swapy-backend.vercel.app/authMe', {
            method: "GET",
            credentials : 'include'
        })
        console.log(response, " response1")
        if(response.ok){
            console.log(response, "response2")
            setIsAuth(true)
            setLoading(false)
            return response
        }else{
            setLoading(false)
            return null
        }
    }


    useEffect( ()=>{
        checkUser()
    },[])

    if(loading) return <Loader/>
    if(!isAuth){
        return navigate('/login')
    }
    return children;
}