import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function OtpVerification() {
    const navigate = useNavigate();
  const [otp, setOtp]=useState(["", "", "", "", "", ""]);

  const [SuccessBox, setSuccessBox]=useState(false);
  const [messageType, setMessageType]=useState("");
  const [message, setMessage]=useState("");

  const handleInput = (value, index)=>{

if (/^[0-9]?$/.test(value)) {
    const fullOtp =[...otp];
 fullOtp[index]=value;
 setOtp(fullOtp)
 if(value && index <otp.length-1){

     document.getElementById(`otp-${index + 1}`).focus()
    }
             
    // console.log( value, index);
    console.log(fullOtp);
}else{
const fullOtp =[...otp];
 fullOtp[index]="";
 setOtp(fullOtp)
}

  }
 useEffect(() => {
    if (messageType=="success") {
      setSuccessBox(true); // show toast
      const timer = setTimeout(() => {
        setSuccessBox(false); // start hide animation
       setTimeout(()=>{navigate("/login"), 4000})
      }, 5000);
      return () => clearTimeout(timer);
    }
    else
    {
      setSuccessBox(true); // show toast
      const timer = setTimeout(() => {
        setSuccessBox(false); // start hide animation
      //  setTimeout(()=>{navigate("/login"), 4000})
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messageType]);

  const handleSubmit =()=>{
    console.log(otp);
 if (otp.join("") === "123456") {
  setMessage("Otp Veryfied Successfully")
  setMessageType("success")
  setOtpSuccess(true); // ✅ trigger success
  // redirect
} else {
  setMessage("Error, Please enter correct code!")
      setMessageType("error")
      setOtpSuccess(true); 
    }
   
  }

    return (
    <div className='h-[80vh] w-screen flex flex-col items-center justify-center  relative '>
           {SuccessBox && (
        <div
          className={`
            fixed top-5 left-1/2 transform -translate-x-1/2
            text-white text-lg font-medium rounded z-50
            transition-all duration-500 ease-in-out
            ${SuccessBox ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
            ${messageType == "success" ? "bg-green-500" : messageType=="error"? "bg-red-600":"" }
            
          `}
        >
          <p className="py-2 px-5">{message}</p>
        </div>
      )}

      <div className='flex flex-col items-center gap-5 border border-gray-300 rounded-lg shadow-lg py-10 sm:w-[500px] w-[90%] text-center '>
        <p className='text-2xl font-bold'>OTP Verification</p>
        <p className='px-2 text-gray-500 font-medium'>Enter the 6-digit code sent to your number</p>
      <div className='w-full flex flex-row gap-2 px-1 items-center justify-center'>
        {otp.map((digit, index)=>(
            <input className='border sm:w-10 w-[10%] h-10 text-xl text-center rounded focus:outline-blue-950'
            id={`otp-${index}`}
            value={digit}
            onChange={(e)=>handleInput(e.target.value, index)}
            key={index} type="text" />
        ))

        }
      </div>
      <button 
      onClick={handleSubmit}
      className='w-[80%] bg-blue-950 text-white py-2 rounded-lg'>Verify</button>
      <div className='flex flex-row text-sm gap-2'>
        <p className='font-light'>Didn't receive the code?</p>
        <p className='text-blue-700'>Resend</p>
      </div>
      </div>
    </div>
  )
}
