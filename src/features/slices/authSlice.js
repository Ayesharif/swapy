import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, login, logout, RegisterUser, reSetPassword, verifyOtp, checkUser } from "../action/authAction";


//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("User"));
//   // console.log(user);
  
//  let userAvail=null
//   if(token){
// userAvail=true
//   }
//   // console.log(userAvail);
  
export const authSlice = createSlice({


  name: "authSlice",
initialState:{
    currentUser:{},
    loading:false,
message: null,
messageType:0,
IsLogin: false
},
    reducers: {
      
    clearMessage: (state) => {
      state.message = "";
      state.messageType = null;
    },
    },
  extraReducers:(builder)=>{
builder.addCase(login.pending, (state)=>{
  state.loading=true;
})
.addCase(login.fulfilled, (state, action)=>{
  state.loading=false;
  state.currentUser=action.payload.data;
  // state.token=action.payload.token;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
  state.IsLogin=true;
})
.addCase(login.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(RegisterUser.pending, (state)=>{
  state.loading=true;
})
.addCase(RegisterUser.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(RegisterUser.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(forgotPassword.pending, (state)=>{
  state.loading=true;
})
.addCase(forgotPassword.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);
  state.currentUser=action.payload.data
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(forgotPassword.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(verifyOtp.pending, (state)=>{
  state.loading=true;
})
.addCase(verifyOtp.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);
  state.currentUser=action.payload.data
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(verifyOtp.rejected, (state, action)=>{
  state.loading=false;  
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(reSetPassword.pending, (state)=>{
  state.loading=true;
})
.addCase(reSetPassword.fulfilled, (state, action)=>{
  state.loading=false;

  state.message=action.payload.message;
  state.messageType=action.payload.status;

})
.addCase(reSetPassword.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(logout.pending, (state)=>{
  state.loading=true;
})
.addCase(logout.fulfilled, (state, action)=>{
  state.loading=false;
  state.currentUser=null;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
  state.IsLogin=false;
})
.addCase(logout.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(checkUser.pending, (state)=>{
  state.loading=true;
})
.addCase(checkUser.fulfilled, (state, action)=>{
  state.loading=false;
  state.currentUser=action.payload.data;
  // state.message=action.payload.message;
  // state.messageType=action.payload.status;
  state.IsLogin=true;
})
.addCase(checkUser.rejected, (state, action)=>{
  state.loading=false;
  // state.message=action.payload.message;
  // state.messageType=action.payload.status;
})

},
});
export const { setMessage, clearMessage } = authSlice.actions;
export default authSlice.reducer;