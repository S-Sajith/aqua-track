import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TodayTab from "./TodayTab";
import HistoryTab from "./HistoryTab";
import InsightsTab from "./InsightsTab";
import AchievementsTab from "./AchievementsTab";

const TabBar = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Box mt={4} p={2} borderRadius={2} boxShadow={2}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Today" />
          <Tab label="History" />
          <Tab label="Insights" />
          <Tab label="Achievements" />
        </Tabs>

        {tabIndex === 0 && <TodayTab />}
        {tabIndex === 1 && <HistoryTab />}
        {tabIndex === 2 && <InsightsTab />}
        {tabIndex === 3 && <AchievementsTab />}
      </Box>
    </div>
  );
};

export default TabBar;
