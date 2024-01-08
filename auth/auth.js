import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const tokenData = Cookies.get("user_token");
    setToken(tokenData);

    if (tokenData) {
      fetchUserData(tokenData);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const logout = () => {
    Cookies.remove("user_token");
    setToken(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ token, userData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
