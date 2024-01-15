import { useContext } from "react";
import authContext from "@/context/auth/authContext";


const useAuth = () => {
    return useContext(authContext);
}

export default useAuth;