import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";



export const getActiveProducts = createAsyncThunk('activeProducts', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:3000/products', {
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
export const getCategoryProducts = createAsyncThunk('getCategoryProducts', async (data, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:3000/category/products/${data}`, {
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

export const searchProducts = createAsyncThunk('searchProducts', async (data, { rejectWithValue }) => {
    try {
        const title =data?.title;
        const city =data?.city;
        const priceMin =data?.priceMin;
        const priceMax =data?.priceMax;
        console.log(priceMax, priceMin);
        
const queryParams = new URLSearchParams({
  ...(title && { title }),
  ...(city && { city }),
  ...(priceMin && { priceMin }),
  ...(priceMax && { priceMax }),
});

        const response = await fetch(`http://localhost:3000/product?${queryParams}`, {
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


export const getDetailProducts = createAsyncThunk('getDetailProducts', async (data, { rejectWithValue }) => {
    console.log(data);
    
    try {
        const response = await fetch(`http://localhost:3000/product/${data}`, {
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





export const getAllUserCategories = createAsyncThunk('allCategories', async (data, { rejectWithValue }) => {

    try {
        const response = await fetch('http://localhost:3000/categories', {
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

export const getPublicProfile = createAsyncThunk('getPublicProfile', async (data, { rejectWithValue }) => {
    // const dispatch = useDispatch()
    console.log(data);
    
    try {
        const response = await fetch(`http://localhost:3000/public-profile?id=${data}`, {
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
