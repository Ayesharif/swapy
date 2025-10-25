import { createSlice } from "@reduxjs/toolkit";
import { addCategory,deleteCategory,getAllCategories, getAllProducts, getAllUsers, updatedCategory, updateProductStatus, updateUserStatus, } from "../../features/action/adminAction";

export const adminSlice = createSlice({
  name: "adminSlice",
initialState:{
    categories:[],
    products:[],
    users:[],
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
builder.addCase(getAllProducts.pending, (state)=>{
  state.loading=true;
})
.addCase(getAllProducts.fulfilled, (state, action)=>{
  state.loading=false;
  state.products=action.payload;

})
.addCase(getAllProducts.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(updateProductStatus.pending,(state, action)=>{
  state.loading=true;
})
.addCase(updateProductStatus.fulfilled,(state, action)=>{
  state.loading=false;
 const updated = action.payload.data;
  const index = state.products.findIndex(p => p._id === updated._id);
  if (index !== -1) {
    state.products[index] = updated;  
  }
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(updateProductStatus.rejected,(state, action)=>{
 state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})

.addCase(getAllCategories.pending, (state)=>{
  state.loading=true;
})
.addCase(getAllCategories.fulfilled, (state, action)=>{
  state.loading=false;
  state.categories=action.payload;
})
.addCase(getAllCategories.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})

.addCase(addCategory.pending, (state)=>{
  state.loading=true;
})
.addCase(addCategory.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);
  state.categories.push(action.payload.data)
    state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(addCategory.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(updatedCategory.pending, (state)=>{
  state.loading=true;
})
.addCase(updatedCategory.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);

   const updated = action.payload.data;
  const index = state.categories.findIndex(c => c._id === updated._id);
  if (index !== -1) {
    state.categories[index] = updated;  
  }
    state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(updatedCategory.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(deleteCategory.pending, (state)=>{
  state.loading=true;
})
.addCase(deleteCategory.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload);
  state.categories = state.categories.filter(
    (category) => category._id !== action.payload.id
  );
    state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(deleteCategory.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(getAllUsers.pending, (state)=>{
  state.loading=true;
})
.addCase(getAllUsers.fulfilled, (state, action)=>{
  state.loading=false;
  // console.log(action.payload.Data);
    state.users=action.payload.Data;

})
.addCase(getAllUsers.rejected, (state, action)=>{
  state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(updateUserStatus.pending,(state, action)=>{
  state.loading=true;
})
.addCase(updateUserStatus.fulfilled,(state, action)=>{
  state.loading=false;
  const updated = action.payload.data;
  const index = state.users.findIndex(u => u._id === updated._id);
  if (index !== -1) {
    state.users[index] = updated;  
  }
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})
.addCase(updateUserStatus.rejected,(state, action)=>{
 state.loading=false;
  state.message=action.payload.message;
  state.messageType=action.payload.status;
})

},
});
export const {  clearMessage } = adminSlice.actions;
export default adminSlice.reducer;