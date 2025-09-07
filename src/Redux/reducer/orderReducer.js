const initialState = {
    orders: [],         // List of all orders
    ordersResult: [],         // List of all orders
    loading: false,     // Track if order is being placed or fetched
    error: null,        // Store error messages if any
    success: false      // Track if order was placed successfully
};

import React from 'react'


export default function orderReducer(state= initialState, action) {
  switch(action.type){
case "GET_ORDER":
return{
...state,
orders: action.payload,
loading: false,  
error: null,
success: true
}
case "REQUEST_ORDER":
return{
 ...state, loading: true, error: null, success: false
}
case "SUCCESS_ORDER":

return{
...state,
ordersResult: [...state.ordersResult, action.payload], 
loading: false,  
error: null,
success: true
}
case "FAILED_ORDER":
return{
...state,
orders: null,
loading: false,  
error: action.payload,
success: false
}

default:
return    state;
  }
}
