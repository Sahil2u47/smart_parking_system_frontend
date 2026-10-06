import { createContext, useState } from "react";

import { storage } from "../utils/storage";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return storage.getUser();
  });

  const [token, setToken] = useState(() => {
    return storage.getToken();
  });

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    storage.setUser(userData);
    storage.setToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    storage.clear();
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
