import { createSlice } from "@reduxjs/toolkit";

import { createProduct, getMyFavourite, getMyProducts, getprofile, IsFavProduct, updateMyProduct, updateProfile } from "../action/userAction";



  
export const userSlice = createSlice({


  name: "userSlice",
initialState:{
    currentUser:{},
    favourite:[],
    products:[],
    loading:false,
message: null,
messageType:0,

},
    reducers: {
      
    clearMessage: (state) => {
      state.message = "";
      state.messageType = null;
    },
    },
  extraReducers:(builder)=>{

builder
.addCase(getprofile.pending, (state)=>{
  state.loading=true;
})
.addCase(getprofile.fulfilled, (state, action)=>{
  state.loading=false;
  state.currentUser=action.payload.data;
  //  state.message=action.payload.message;
  // state.messageType=action.payload.status;
 })
.addCase(getprofile.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})

.addCase(getMyProducts.pending, (state)=>{
  state.loading=true;
})
.addCase(getMyProducts.fulfilled, (state, action)=>{
  state.loading=false;
  state.products=action.payload.data;
  //  state.message=action.payload.message;
  // state.messageType=action.payload.status;
 })
.addCase(getMyProducts.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})

.addCase(createProduct.pending, (state)=>{
  state.loading=true;
})
.addCase(createProduct.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);
  state.products.push(action.payload.data)
    state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(createProduct.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})

.addCase(updateMyProduct.pending, (state)=>{
  state.loading=true;
})
.addCase(updateMyProduct.fulfilled, (state, action)=>{
  state.loading=false;
  const updated = action.payload.data;
  const index = state.products.findIndex(p => p._id === updated._id);
  if (index !== -1) {
    state.products[index] = updated;  
  }
   state.message=action.payload.message;
  state.messageType=action.payload.status;
 })
.addCase(updateMyProduct.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
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
.addCase(IsFavProduct.pending, (state)=>{
  state.loading=true;
})
.addCase(IsFavProduct.fulfilled, (state, action)=>{
  state.loading=false;
state.favourite=action.payload.favourites
  
 })
.addCase(IsFavProduct.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(getMyFavourite.pending, (state)=>{
  state.loading=true;
})
.addCase(getMyFavourite.fulfilled, (state, action)=>{
  state.loading=false;
  state.favourite=action.payload.products;
 })
.addCase(getMyFavourite.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})


},
});
export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;