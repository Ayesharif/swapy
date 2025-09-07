// actionTypes.js


export const registerUser = (formData, navigate) => {
  return async (dispatch) => {
    // Dispatch loading = true
    dispatch({
      type: 'REGISTER',
      payload: {
        loading: true,
        user: null,
        error: null
      }
    });
    const { email, password, ...profileData } = formData;
    try {

//        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const firebaseUser = userCredential.user;

        
// const docRef = await addDoc(collection(db, 'users'), {
//         uid: firebaseUser.uid,
//         email,
//         ...profileData
//       });
//        const userWithId = {
//         uid: firebaseUser.uid,
//         email,
//         ...profileData,
//         id: docRef.id
//       };
//       // Dispatch success
//       dispatch({
//         type: 'REGISTER',
//         payload: {
//           loading: false,
//           user: userWithId,
//           error: null
//         }
      // });
navigate('/');
    } catch (err) {
      // Dispatch error
      dispatch({
        type: 'REGISTER',
        payload: {
          loading: false,
          user: null,
          error: err.message
        }
      });
    }
  };
};


// Login action
export const loginUser = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        loading: true,
        user: null,
        error: null
      }
    });

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
 const user = userCredential.user;

       // 🔍 Query Firestore users collection for user UID
      const q = query(collection(db, 'users'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("User record not found in Firestore.");
      }

      const userDoc = querySnapshot.docs[0];
      console.log(userDoc)
      const role = userDoc.data().role;
      const Data = userDoc.data();
            const userData = {
Data,
role
      };
      dispatch({
        type: 'LOGIN',
        payload: {
          loading: false,
          user: userData,
          error: null
        }
      });
      console.log(auth);
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "user") {
        navigate("/profile");
      } else {
        throw new Error("Invalid role");
      }



    } catch (err) {
      dispatch({
        type: 'LOGIN',
        payload: {
          loading: false,
          user: null,
          error: err.message
        }
      });
    }
  };
};

// actionTypes.js
export const logout = ()=>{
return async (dispatch) => {

      // Dispatch success
      dispatch({
        type: 'LOGOUT',
        payload: {
          loading: false,
          user: null,
          error: null
        }
      });


  };
};