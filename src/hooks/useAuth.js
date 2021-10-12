import { useContext } from "react";
import { AuthContext } from "../contexts/FirebaseProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
