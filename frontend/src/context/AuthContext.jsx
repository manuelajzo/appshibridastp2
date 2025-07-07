import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import * as jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loadUserFromCookies = () => {
    const token = Cookies.get("jwToken");
    if (token) {
      try {
        const decoded = jwtDecode.default(token);
        setUser({
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        setUser(null);
        Cookies.remove("jwToken");
      }
    } else {
      setUser(null);
    }
  };

  const loginUser = (token) => {
    Cookies.set("jwToken", token);
    loadUserFromCookies();
  };

  const logoutUser = () => {
    setUser(null);
    Cookies.remove("jwToken");
  };

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
