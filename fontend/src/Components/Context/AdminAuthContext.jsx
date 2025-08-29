import { createContext } from "react";


export const AdminAuthContext = createContext({
  user:localStorage.getItem('Admininfo'),
});