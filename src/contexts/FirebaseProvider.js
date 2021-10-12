import React, { createContext } from "react";

import useFirebase from "../hooks/useFirebase";

export const AuthContext = createContext();

const FirebaseProvider = ({ children }) => {
  const userLogIn = useFirebase();
  return (
    <AuthContext.Provider value={userLogIn}>{children}</AuthContext.Provider>
  );
};

export default FirebaseProvider;
