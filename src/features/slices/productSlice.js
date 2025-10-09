import { createSlice } from "@reduxjs/toolkit";
import {  getActiveProducts, getCategoryProducts, getDetailProducts, searchProducts } from "../../features/action/productAction";
import { getAllUserCategories } from "../action/productAction";

export const productSlice = createSlice({
  name: "productSlice",
initialState:{
    products:[],
    categories:[],
    currentProduct:{},
message: null,
messageType: null,
loading:false
},
    reducers: {
          clearMessage: (state) => {
      state.message = "";
      state.messageType = null;
    },
    },
  extraReducers:(builder)=>{
builder
.addCase(getActiveProducts.pending, (state)=>{
  state.loading=true;
})
.addCase(getActiveProducts.fulfilled, (state, action)=>{
  console.log(action.payload.data);
  state.loading=false;
  state.products=action.payload.data;

})
.addCase(getActiveProducts.rejected, (state, action)=>{
  state.loading=false;
    state.message=action.payload.message;
  state.messageType=action.payload.status;
})

.addCase(getCategoryProducts.pending, (state)=>{
  state.loading=true;
})
.addCase(getCategoryProducts.fulfilled, (state, action)=>{
  console.log(action.payload.data);
  state.loading=false;
  state.products=action.payload.data;

})
.addCase(getCategoryProducts.rejected, (state, action)=>{
  state.loading=false;
    state.message=action.payload.message;
  state.messageType=action.payload.status;

})
.addCase(searchProducts.pending, (state)=>{
  state.loading=true;
})
.addCase(searchProducts.fulfilled, (state, action)=>{
  console.log(action.payload.data);
  state.loading=false;
  state.products=action.payload.data;
    state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(searchProducts.rejected, (state, action)=>{
  state.loading=false;
    state.message=action.payload.message;
  state.messageType=action.payload.status;

})
.addCase(getDetailProducts.pending, (state)=>{
  state.loading=true;
})
.addCase(getDetailProducts.fulfilled, (state, action)=>{
  console.log(action.payload.data);
  state.loading=false;
  state.currentProduct=action.payload.data;

})
.addCase(getDetailProducts.rejected, (state, action)=>{
  state.loading=false;
    state.message=action.payload.message;
  state.messageType=action.payload.status;

})

.addCase(getAllUserCategories.pending, (state)=>{
  state.loading=true;
})
.addCase(getAllUserCategories.fulfilled, (state, action)=>{
  state.loading=false;
  state.categories=action.payload;
})
.addCase(getAllUserCategories.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})


},
});
export const { clearMessage } = productSlice.actions;
export default productSlice.reducer;