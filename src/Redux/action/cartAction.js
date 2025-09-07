export const addToCart = (product) => ({
  type: "ADD_TO_CART",
  payload: product,
  
});

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});


export const updateCart = (id, quantity) => ({
  type: "UPDATE_CART",
  payload: { id, quantity },
});

export const checkedProduct = (product) => ({
  type: "CHECK_PRODUCT",
  payload: product,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const setTotalPrice = (price) => ({
  type: "SET_TOTAL_PRICE",
  payload: price,
});

