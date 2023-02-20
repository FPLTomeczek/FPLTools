import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [startTime, setStartTime] = useState("");
  const updateStartTime = (time) => {
    setStartTime(time);
  };

  return (
    <AppContext.Provider value={{ startTime, updateStartTime }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
