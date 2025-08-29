
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const AuthRequire = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {

        return <Navigate to="/Userlogin" />;
    }
    return children;
}