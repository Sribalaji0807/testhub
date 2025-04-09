import React, { useEffect } from "react";
import { useState } from "react";
const AuthUser=React.createContext();

export const DataProvider = ({ children }) => {
  const [Admin,setAdmin]=useState(false);
    const [userData, setUserData] = useState(()=>{
      const Store=localStorage.getItem("userData");
      if(Store===undefined)
      return Store?JSON.parse(Store):null;
    else
    return null
    });


    useEffect(() => {
      const fetchUserData = async () => {
        const store = localStorage.getItem("userData");
        if (store) {
          setUserData(JSON.parse(store)); 
          setSession(true);
        }
      };
  
      fetchUserData();   }, []);
      useEffect(() => {
        const intervalId = setInterval(monitorTokenExpiration, 24*60*60*1000); 
    
        
        return () => clearInterval(intervalId);
    }, []);
    const updateUserData = (data) => {
      setUserData(data);
      setAdmin(data.Admin);
      localStorage.setItem("userData", JSON.stringify(data));
      const tokenExpirationTime = data.tokenExpirationTime;
      localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
      setSession(true);
    };
    function monitorTokenExpiration() {
      const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
  
      if (tokenExpirationTime) {
          const currentTime = Date.now();
  
          if (currentTime >= tokenExpirationTime) {
              console.log('Token expired. Clearing localStorage.');
             clearUserData();
            
            
          }
      }
  }
  const clearUserData=()=>{
    setUserData(null);
    localStorage.removeItem("userData");
    localStorage.removeItem('tokenExpirationTime');
  }
  const [session,setSession]=useState(false);
    return (
      <AuthUser.Provider value={{ userData,clearUserData,Admin ,updateUserData,session }}>
        {children}
      </AuthUser.Provider>
    );
  };
  export default AuthUser;