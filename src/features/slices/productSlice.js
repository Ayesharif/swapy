import { createSlice } from "@reduxjs/toolkit";
import { createProduct, getActiveProducts } from "../../features/action/productAction";
import { getAllUserCategories } from "../action/productAction";

export const productSlice = createSlice({
  name: "productSlice",
initialState:{
    products:[],
    categories:[],
message: null,
messageType: null,
loading:false
},
    reducers: {},
  extraReducers:(builder)=>{
builder
.addCase(getActiveProducts.pending, (state)=>{
  state.loading=true;
})
.addCase(getActiveProducts.fulfilled, (state, action)=>{
  console.log(action.payload.data);
  state.loading=false;
  state.products=action.payload.data;
  
    state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(getActiveProducts.rejected, (state, action)=>{
  state.loading=false;
    state.message=action.payload.message;
  state.messageType=action.payload.status;

})
.addCase(createProduct.pending, (state)=>{
  state.loading=true;
})
.addCase(createProduct.fulfilled, (state, action)=>{
  state.loading=false;
  console.log(action.payload);
  state.products.push(action.payload.data)
    state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(createProduct.rejected, (state, action)=>{
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

export default productSlice.reducer;