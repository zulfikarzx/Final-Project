import { useState } from "react";
import { AuthContext } from "./AuthContext";



export const AuthProvider = ({ children }) => {
    const userinfo = localStorage.getItem('userinfo');
   
    const [user, setuser] = useState(userinfo);

    function login(user) {
        
        setuser(user);
    }
    const logout = () => {
        localStorage.removeItem('userinfo');
        setuser(null);
    }

    return ( <div>

<AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
        
</div>
    ) 

        
    
}
