import { Box, Typography, useTheme } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { parseISO, format, startOfWeek, addDays, isSameDay } from "date-fns";
import React from "react";

const HistoryTab = () => {
  const { hydrationData, baseGoal } = useAppContext();
  const theme = useTheme();

  const getWeeklyOverview = () => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const week = [];

    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      const dataForDay = hydrationData.find((d) =>
        isSameDay(parseISO(d.date), date)
      );

      week.push({
        day: format(date, "EEE"),
        total: dataForDay?.totalIntake || 0,
      });
    }

    return week;
  };

  const week = getWeeklyOverview();

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Weekly Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your hydration history
      </Typography>

      {week.map((day, idx) => (
        <React.Fragment key={idx}>
          <Box
            key={idx}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 1,
            }}
          >
            <Typography sx={{ width: 40 }} variant="body2">
              {day.day}
            </Typography>
            <Typography
              sx={{ minWidth: 40 }}
              variant="body2"
              color="text.secondary"
            >
              {day.total}ml
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: {
                xs: 8,
                sm: 9,
              },
              backgroundColor: theme.palette.mode === "dark" ? "black" : "#eee",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${Math.min((day.total / baseGoal) * 100, 100)}%`,
                height: "100%",
                backgroundColor:
                  theme.palette.mode === "dark" ? "white" : "black",
              }}
            />
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

export default HistoryTab;
