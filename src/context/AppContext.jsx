import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [baseGoal, setBaseGoal] = useState("2000");
  const [hydrationData, setHydrationData] = useState(() => {
    const stored = localStorage.getItem("aquatrack_history");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist hydrationData to localStorage
  useEffect(() => {
    localStorage.setItem("aquatrack_history", JSON.stringify(hydrationData));
  }, [hydrationData]);

  const addLog = (amount, type) => {
    const today = new Date().toISOString().split("T")[0]; // e.g., "2025-06-03"
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setHydrationData((prev) => {
      const existingDay = prev.find((entry) => entry.date === today);

      if (existingDay) {
        return prev.map((entry) =>
          entry.date === today
            ? {
                ...entry,
                totalIntake: entry.totalIntake + amount,
                logs: [...entry.logs, { amount, type, time, date: today }],
              }
            : entry
        );
      } else {
        return [
          ...prev,
          {
            date: today,
            totalIntake: amount,
            logs: [{ amount, type, time, date: today }],
          },
        ];
      }
    });
  };

  const resetToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setHydrationData((prev) =>
      prev.map((entry) =>
        entry.date === today ? { ...entry, logs: [], totalIntake: 0 } : entry
      )
    );
  };

  return (
    <AppContext.Provider
      value={{ baseGoal, setBaseGoal, hydrationData, addLog, resetToday }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
