import { useContext } from "react";
import appContext from "@/context/app/appContext";


const useApp = () => {
    return useContext(appContext);
}

export default useApp;