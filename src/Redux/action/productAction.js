import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/fireCofig";

export const addingProduct = (product) => async () => {
  const docRef = await addDoc(collection(db, "products"), product
  );
//   console.log(docRef)
};
export const deleteProduct = (id) => async () => {
  await deleteDoc(doc(db, "products", id));
// console.log(id);

  
//   console.log(docRef)
};
export const updateProduct = (formData, editId) => async () => {
 await updateDoc(doc(db, "products", editId), formData);
// console.log(id);

  
//   console.log(docRef)
};

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });


export const listenToProducts = () => (dispatch) => {
  const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(products);
    
    dispatch({ type: "SET_PRODUCTS", payload: products });
  });

  return unsubscribe; // for cleanup
};


