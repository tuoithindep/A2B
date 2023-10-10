import React, { createContext, useState } from 'react';

export const TokenContext = createContext();
const TokenProvider = ({ children }) => {
  const [token, setToken] = useState({});
  const value = {
    token,
    setToken,
  };
  return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
    // const [token, setToken] = useState({ id: 1 });
    // const value = {
    //     token,
    //     setToken,
    // };
    // return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>;
};

export default TokenProvider;
