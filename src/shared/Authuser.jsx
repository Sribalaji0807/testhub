import React from "react";
import { useState } from "react";
const AuthUser=React.createContext();

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState(()=>{
      const Store=localStorage.getItem("userData");
      return Store?JSON.parse(Store):null;
    });
  
    const updateUserData = (data) => {
      setUserData(data);
      localStorage.setItem("userData", JSON.stringify(data));
    };
  const clearUserData=()=>{
    setUserData(null);
    localStorage.removeItem("userData",)
  }
    return (
      <AuthUser.Provider value={{ userData,clearUserData ,updateUserData }}>
        {children}
      </AuthUser.Provider>
    );
  };
  export default AuthUser;