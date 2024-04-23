import React from "react";

const AuthUser=React.createContext();

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
  
    const updateUserData = (data) => {
      setUserData(data);
    };
  
    return (
      <AuthUser.Provider value={{ userData, updateUserData }}>
        {children}
      </AuthUser.Provider>
    );
  };
  export default AuthUser;