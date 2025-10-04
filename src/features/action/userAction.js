import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setMessage } from "../slices/userSlice";


export const getprofile = createAsyncThunk('getProfile', async (data, { rejectWithValue }) => {
    // const dispatch = useDispatch()
    try {
        const response = await fetch('https://swapy-backend.vercel.app/user/profile', {
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



export const updateProfile = createAsyncThunk('updateProfile', async (data, { rejectWithValue }) => {

    try {
        console.log(data)
        const response = await fetch('https://swapy-backend.vercel.app/user/profile', {
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