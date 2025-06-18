import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { useState } from "react";
import TodayTab from "./TodayTab";
import HistoryTab from "./HistoryTab";
import InsightsTab from "./InsightsTab";
import AchievementsTab from "./AchievementsTab";
import ShareTab from "./ShareTab";
import CaffeineTab from "./CaffeineTab";
import useMediaQuery from "@mui/material/useMediaQuery";

const TabBar = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Box
        mt={4}
        p={2}
        borderRadius={2}
        boxShadow={2}
        bgcolor={theme.palette.background.paper}
      >
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.background.default
                : "#f5f5f5",
            borderRadius: "8px",
            minHeight: "40px",
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              minHeight: "40px",
              minWidth: "100px",
              borderRadius: "8px",
              mx: 0.5,
              my: 0.5,
              "&:focus": {
                outline: "none",
              },
              "&:focus-visible": {
                outline: "none",
              },
            },
            "& .Mui-selected": {
              backgroundColor: theme.palette.background.paper,
              fontWeight: "bold",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 2px 8px rgba(0, 0, 0, 0.6)"
                  : "0 1px 4px rgba(0, 0, 0, 0.1)",
              color: theme.palette.text.primary,
            },
          }}
        >
          <Tab label="Today" />
          <Tab label="History" />
          <Tab label="Insights" />
          <Tab label="Caffeine" />
          <Tab label="Achievements" />
          <Tab label="Share" />
        </Tabs>
        {tabIndex === 0 && <TodayTab />}
        {tabIndex === 1 && <HistoryTab />}
        {tabIndex === 2 && <InsightsTab />}
        {tabIndex === 3 && <CaffeineTab />}
        {tabIndex === 4 && <AchievementsTab />}
        {tabIndex === 5 && <ShareTab />}
      </Box>
    </div>
  );
};

export default TabBar;
