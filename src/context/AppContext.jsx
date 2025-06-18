import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { parseISO, differenceInCalendarDays, isSameDay } from "date-fns";
import BoltIcon from "@mui/icons-material/Bolt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SunnyIcon from "@mui/icons-material/Sunny";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OpacityIcon from "@mui/icons-material/Opacity";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [baseGoal, setBaseGoal] = useState("2000");
  const [hydrationData, setHydrationData] = useState(() => {
    const stored = localStorage.getItem("aquatrack_history");
    return stored ? JSON.parse(stored) : [];
  });
  const [weatherAdjustment, setWeatherAdjustment] = useState(0);

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("aquatrack_dark_mode");
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("aquatrack_dark_mode", darkMode);
  }, [darkMode]);

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
      prev.map((entry) => {
        if (entry.date !== today) return entry;

        // Destructure to exclude caffeine-related fields
        const { caffeineLogs, caffeineIntake, caffeineOffset, ...rest } = entry;

        return {
          ...rest,
          logs: [],
          totalIntake: 0,
        };
      })
    );
  };

  const resetLogs = () => {
    setHydrationData([]);
  };

  const achievements = useMemo(() => {
    const today = new Date();
    const sortedData = [...hydrationData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let currentStreak = 1;
    const reversedData = [...sortedData].reverse();

    for (let i = 1; i < reversedData.length; i++) {
      const prevDate = parseISO(reversedData[i].date);
      const currDate = parseISO(reversedData[i - 1].date);
      const dayDiff = differenceInCalendarDays(prevDate, currDate);

      if (dayDiff === 1) {
        currentStreak++;
      } else if (dayDiff > 1 || differenceInCalendarDays(today, currDate) > 1) {
        break;
      }
    }

    const todayData = sortedData.find((day) =>
      isSameDay(parseISO(day.date), today)
    );
    const todayGoalPercent = todayData
      ? Math.round((todayData.totalIntake / baseGoal) * 100)
      : 0;
    const goalAchievedToday = todayData?.totalIntake >= baseGoal;
    const todayLogs = todayData?.logs || [];

    const consistencyProgress = Math.min(todayLogs.length, 5);

    const earlyBird = todayLogs.some((log) => {
      const [time, meridian] = log.time.split(" ");
      const [hour] = time.split(":");
      const hour24 = meridian === "PM" && +hour < 12 ? +hour + 12 : +hour;
      return hour24 < 9;
    });

    return [
      {
        key: "streak_master",
        title: "Streak Master",
        description: "Maintain a 3-day streak",
        progress: `${Math.min(currentStreak, 3)}/3 days`,
        achieved: currentStreak >= 3,
        icon: <BoltIcon fontSize="medium" />,
      },
      {
        key: "goal_achiever",
        title: "Goal Achiever",
        description: "Reach your daily goal",
        progress: `${todayGoalPercent}%`,
        achieved: !!goalAchievedToday,
        icon: <EmojiEventsIcon fontSize="medium" />,
      },
      {
        key: "early_bird",
        title: "Early Bird",
        description: "Drink water before 9 AM",
        progress: earlyBird ? "✔️" : "Not yet",
        achieved: earlyBird,
        icon: <SunnyIcon fontSize="medium" />,
      },
      {
        key: "consistency_king",
        title: "Consistency King",
        description: "Drink 5+ times in a day",
        progress: `${consistencyProgress}/5 times`,
        achieved: consistencyProgress >= 5,
        icon: <CalendarTodayIcon fontSize="medium" />,
      },
      {
        key: "hydration_hero",
        title: "Hydration Hero",
        description: "Drink 150% of your daily goal",
        progress: `${todayGoalPercent}%`,
        achieved: todayGoalPercent >= 150,
        icon: <OpacityIcon fontSize="medium" />,
      },
    ];
  }, [hydrationData, baseGoal]);

  return (
    <AppContext.Provider
      value={{
        baseGoal,
        setBaseGoal,
        hydrationData,
        setHydrationData,
        addLog,
        resetToday,
        resetLogs,
        achievements,
        weatherAdjustment,
        setWeatherAdjustment,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
