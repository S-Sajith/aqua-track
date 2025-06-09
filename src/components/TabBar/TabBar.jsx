import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TodayTab from "./TodayTab";
import HistoryTab from "./HistoryTab";

const TabBar = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Box mt={4} p={2}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Today" />
          <Tab label="History" />
        </Tabs>

        {tabIndex === 0 && <TodayTab />}
        {tabIndex === 1 && <HistoryTab />}
      </Box>
    </div>
  );
};

export default TabBar;
