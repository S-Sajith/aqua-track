import { useContext, useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [baseGoal, setBaseGoal] = useState("2000");

  return (
    <AppContext.Provider value={{ baseGoal, setBaseGoal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
