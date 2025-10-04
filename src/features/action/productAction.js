import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";



export const getActiveProducts = createAsyncThunk('activeProducts', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch('https://swapy-backend.vercel.app//products', {
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



export const createProduct = createAsyncThunk('createProduct', async (data, { rejectWithValue }) => {
    try {
        console.log(data)
        const response = await fetch('https://swapy-backend.vercel.app//user/product', {
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

export const getAllUserCategories = createAsyncThunk('allCategories', async (data, { rejectWithValue }) => {

    try {
        const response = await fetch('https://swapy-backend.vercel.app//admin/categories', {
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