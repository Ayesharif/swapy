const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null
};
const authReducer = (state = initialState, action={}) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        user: action.payload.user 
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null

      };

    case "REGISTER":
      return {
        ...state,
        user: action.payload.user || null,
        loading: action.payload.loading || false,
        error: action.payload.error || null

      };
    default:
      return state;
  }
};

export default authReducer;