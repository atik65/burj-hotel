import initializeAuthenticaion from "../firebase/initializeAuthenticaion";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";

initializeAuthenticaion();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");
  const history = useHistory();
  //   sign in with google function
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // create user with email and password function
  const createUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // sign out function

  const logOut = () => {
    signOut(auth)
      .then((result) => {
        setErr("Sign Out Successfull");
        setUser({});
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  // sign in with email and password
  const logInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update user function

  const updateUser = (infoObj) => {
    updateProfile(auth.currentUser, infoObj)
      .then(() => {
        console.log("profile Updated");

        // setUser(auth.currentUser);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //   on auth state change function

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
  }, []);

  return {
    googleSignIn,
    logOut,
    err,

    user,
    createUserWithEmail,
    updateUser,
    auth,
    logInWithEmail,
  };
};

export default useFirebase;
