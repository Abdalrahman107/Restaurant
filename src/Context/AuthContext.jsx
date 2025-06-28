import React, { createContext, useMemo, useState } from 'react';

export const authContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('toky'));
  const value = useMemo(() => ({ token, setToken }), [token]);

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
