import {  useState } from "react";
import { AdminAuthContext } from "./AdminAuthContext";
import Login from "../Admin/Login";


export const AdminAuthProvider = ({ children }) => {
    const Admininfo = localStorage.getItem('Admininfo');
   
    const [user, setuser] = useState(Admininfo);

    function login(user) {
        
        setuser(user);
    }
    const logout = () => {
        localStorage.removeItem('Admininfo');
        setuser(null);
    }

    return ( <div>

<AdminAuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AdminAuthContext.Provider>
        
</div>
    ) 

        
    
}




