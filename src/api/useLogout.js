import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useLogout = () => {

    const { setUser } = useContext(AuthContext);

    const logout = () => {
        // Remove from local storage
        localStorage.removeItem('user');
        // Remove from AuthContext
        setUser(null);
    }

    return { logout };
}