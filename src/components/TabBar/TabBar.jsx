import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TodayTab from "./TodayTab";
import HistoryTab from "./HistoryTab";
import InsightsTab from "./InsightsTab";
import AchievementsTab from "./AchievementsTab";
import ShareTab from "./ShareTab";
import useMediaQuery from "@mui/material/useMediaQuery";

const TabBar = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Box mt={4} p={2} borderRadius={2} boxShadow={2}>
        <Tabs
          value={tabIndex}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          sx={{
            backgroundColor: "#f5f5f5",
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
              backgroundColor: "#fff",
              fontWeight: "bold",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              color: "#000",
            },
          }}
        >
          <Tab label="Today" />
          <Tab label="History" />
          <Tab label="Insights" />
          <Tab label="Achievements" />
          <Tab label="Share" />
        </Tabs>
        {tabIndex === 0 && <TodayTab />}
        {tabIndex === 1 && <HistoryTab />}
        {tabIndex === 2 && <InsightsTab />}
        {tabIndex === 3 && <AchievementsTab />}
        {tabIndex === 4 && <ShareTab />}
      </Box>
    </div>
  );
};

export default TabBar;
