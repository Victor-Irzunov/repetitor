"use client"
import { createContext, useState } from 'react';

const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const [state, setState] = useState({});
  const updateState = (newState) => {
    setState(newState);
  };
  return (
    <MyContext.Provider value={{ state, updateState }}>
      {children}
    </MyContext.Provider>
  );
};
export { MyContext, MyContextProvider };
