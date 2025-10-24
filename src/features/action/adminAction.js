import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "react-router-dom";

export const getAllProducts = createAsyncThunk('allProducts', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/admin/products', {
            credentials: "include"
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const result = await response.json()
        console.log(result);
        return result

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const updateProductStatus= createAsyncThunk('updateProductStatus', async (data, {rejectWithValue})=>{
         try {
        console.log(data)
        const response = await fetch(`http://localhost:3000/admin/product/${data}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"

        }
        )
         if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        console.log(result)

        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})

export const getAllCategories = createAsyncThunk('allCategories', async (data, { rejectWithValue }) => {

    try {
        const response = await fetch('http://localhost:3000/admin/categories', {
            method:"Get",
            credentials: "include"

        });
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        console.log(result);
        return result

    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const addCategory = createAsyncThunk('addCategory', async (data, { rejectWithValue }) => {
    try {
        console.log(data)
        const response = await fetch('http://localhost:3000/admin/category', {
            method: "POST",
           
            body: data,
            credentials:"include"
        }
        )

                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const updatedCategory = createAsyncThunk('updateCategory', async (data, { rejectWithValue }) => {
    try {
        console.log(data)
        const response = await fetch(`http://localhost:3000/admin/category/${data.id}`, {
            method: "Put",
            
            body: data.form,
        credentials:"include"
        }
        )
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const deleteCategory = createAsyncThunk('deleteCategory', async (data, { rejectWithValue }) => {
    try {
        console.log(data)
        const response = await fetch(`http://localhost:3000/admin/category/${data}`, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
            },
credentials:"include"
        }
        )
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getAllUsers = createAsyncThunk('allUsers', async (data, { rejectWithValue }) => {

    try {
        const response = await fetch('http://localhost:3000/admin/users', {
            method:"Get",
            credentials: "include"

        });
                 if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        console.log(result.data);
        return result

    } catch (error) {
        return rejectWithValue(error.message)
    }
})


export const updateUserStatus= createAsyncThunk('updateUserStatus', async (data, {rejectWithValue})=>{
         try {
        console.log(data)
        const response = await fetch(`http://localhost:3000/admin/user/${data}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        }
        )
         if (!response.ok) {
              const errorData = await response.json(); 
              return rejectWithValue(errorData);
            }
        const result = await response.json()
        console.log(result)

        return result
    } catch (error) {
        return rejectWithValue(error)
    }

})