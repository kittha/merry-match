import { useContext } from "react";
import { AuthContext } from "../contexts/authentication";

const useAuth = () => useContext(AuthContext);

export default useAuth;
