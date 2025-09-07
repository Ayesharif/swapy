import React from 'react'
import { checkedProduct } from '../action/cartAction';




const initialState = {
  products: [],
  checkProducts: [],
  totalPrice: 0
};

const cartReducer = (state = initialState, action={}) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if product already exists
      const exist = state.products.find(item => item.id === action.payload.id);

      if (exist) {
        // If exists, update quantity
        return {
          ...state,
          products: state.products.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If new, add to cart with quantity 1
        return {
          ...state,
          products: [...state.products, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(item => item.id !== action.payload),
      };

      case "UPDATE_CART":
return {
    ...state,
    products : state.products.map(item =>
      item.id === action.payload.id
        ? { ...item, quantity: action.payload.quantity }
        : item
      ),

    checkProducts : state.checkProducts.map(item =>
      item.id === action.payload.id
        ? { ...item, quantity: action.payload.quantity }
        : item
    ),
  };


    case "CHECK_PRODUCT":
         
const isChecked = state.checkProducts.find(item => item.id === action.payload.id);
  return {
    ...state,
    checkProducts: isChecked
      ? state.checkProducts.filter(item => item.id !== action.payload.id) // Remove if already selected
      : [...state.checkProducts, action.payload], // Add if not selected
  };


  case "SET_TOTAL_PRICE":
  return {
    ...state,
    totalPrice: action.payload,
  };
    default:
      return state;
  }
};

export default cartReducer;

