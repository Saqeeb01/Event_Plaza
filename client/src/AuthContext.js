import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const userRoles = ['organizer']; // Example user roles

  return (
    <AuthContext.Provider value={{ userRoles }}>
      {children}
    </AuthContext.Provider>
  );
};
