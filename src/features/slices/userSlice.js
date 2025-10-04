import { createSlice } from "@reduxjs/toolkit";

import { getprofile, updateProfile } from "../action/userAction";



  
export const userSlice = createSlice({


  name: "userSlice",
initialState:{
    currentUser:{},
    loading:false,
message: null,
messageType:0,

},
    reducers: {
         setMessage: (state, action) => {
      state.message = action.payload.message;
      state.messageType = action.payload.type;
    },
    clearMessage: (state) => {
      state.message = "";
      state.messageType = null;
    },
    },
  extraReducers:(builder)=>{

builder.addCase(getprofile.pending, (state)=>{
  state.loading=true;
})
.addCase(getprofile.fulfilled, (state, action)=>{
  state.loading=false;
  state.currentUser=action.payload.data;
//    state.message=action.payload.message;
//   state.messageType=action.payload.status;
 })
.addCase(getprofile.rejected, (state, action)=>{
  state.loading=false;
//   state.message=action.payload.message;
//   state.messageType=action.payload.status;
})
.addCase(updateProfile.pending, (state)=>{
  state.loading=true;
})
.addCase(updateProfile.fulfilled, (state, action)=>{
  state.loading=false;
  state.currentUser=action.payload.data;
   state.message=action.payload.message;
  state.messageType=action.payload.status;
 })
.addCase(updateProfile.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})


},
});
export const { setMessage, clearMessage } = userSlice.actions;
export default userSlice.reducer;