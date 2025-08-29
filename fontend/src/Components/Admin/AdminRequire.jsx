
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../Context/AdminAuthContext";
import { useContext } from "react";

export const AdminRequire = ({ children }) => {
    const { user } = useContext(AdminAuthContext);

    if (!user) {

        return <Navigate to="/login" />;
    }
    return children;
}