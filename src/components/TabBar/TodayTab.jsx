import { Box, Typography, Paper, List, useTheme } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { isToday, parseISO } from "date-fns";

import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import ScienceIcon from "@mui/icons-material/Science";
import CategoryIcon from "@mui/icons-material/Category";
import OpacityIcon from "@mui/icons-material/Opacity";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import WineBarIcon from "@mui/icons-material/WineBar";

const getIntakeIcon = (type) => {
  switch (type) {
    case "glass":
      return <LocalDrinkIcon color="primary" />;
    case "small bottle":
      return <ScienceIcon color="primary" />;
    case "regular bottle":
      return <CategoryIcon color="primary" />;
    case "large bottle":
      return <OpacityIcon color="primary" />;
    case "coffee mug":
      return <LocalCafeIcon color="primary" />;
    case "milk glass":
      return <WineBarIcon color="primary" />;
    default:
      return <LocalDrinkIcon color="primary" />;
  }
};

const TodayTab = () => {
  const { hydrationData, baseGoal } = useAppContext();
  const theme = useTheme();

  const todayLogs =
    hydrationData.find((d) => isToday(parseISO(d.date)))?.logs || [];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Today's Log
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your water intake throughout the day
      </Typography>

      {todayLogs.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No logs yet.
        </Typography>
      ) : (
        <List disablePadding>
          {todayLogs.map((log, idx) => (
            <Paper
              key={idx}
              sx={{
                p: 1.5,
                my: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                {getIntakeIcon(log.type)}
                <Box>
                  <Typography fontWeight="case">{log.amount}ml</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {log.time}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" fontWeight="bold">
                +{Math.round((log.amount / baseGoal) * 100)}%
              </Typography>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TodayTab;
