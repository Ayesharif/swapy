import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/fireCofig";
import { useDispatch } from "react-redux";

export const addOrder = (order, navigate) =>{
return async(dispatch)=>{
dispatch({type: "REQUEST_ORDER"});
try{
    
    
    await addDoc(collection(db, "orders"), order
);
dispatch({type: "SUCCESS_ORDER",payload: order});

navigate('/checkorder');
}
catch(error){
dispatch({ type: "FAILED_ORDER", payload: error.message });
}

}
}

export const listenToOrders = () => (dispatch) => {
  
  // Optional: Dispatch loading state if needed
  dispatch({ type: "REQUEST_ORDERS" });

  const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log("Real-time Orders:", orders);
    dispatch({ type: "GET_ORDER", payload: orders });
  }, (error) => {
    console.error("Error listening to orders:", error.message);
    dispatch({ type: "FAILED_ORDERS", payload: error.message });
  });

  return unsubscribe; // Allows cleanup in component
};