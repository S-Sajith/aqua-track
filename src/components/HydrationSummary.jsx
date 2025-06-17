import {
  Box,
  Typography,
  LinearProgress,
  Button,
  Chip,
  Modal,
  Tooltip,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useAppContext } from "../context/AppContext";
import CaffeineModal from "./CaffeineModal";
import { useState } from "react";

const HydrationSummary = () => {
  const {
    baseGoal,
    hydrationData,
    resetToday,
    achievements,
    weatherAdjustment,
  } = useAppContext();

  const [openCaffeineIntake, setOpenCaffeineIntake] = useState(false);
  const handleOpenCaffeineIntake = () => setOpenCaffeineIntake(true);
  const handleCloseCaffeineIntake = () => setOpenCaffeineIntake(false);

  const unlockedAchievements = achievements.filter((a) => a.achieved);

  const today = new Date().toISOString().split("T")[0];
  const todayEntry = hydrationData.find((entry) => entry.date === today);
  const currentIntake = todayEntry?.totalIntake || 0;

  const caffeineOffset = todayEntry?.caffeineOffset || 0;

  // Calculate adjusted goal with weather and caffeine
  const adjustedGoal =
    Number(baseGoal) +
    Number(weatherAdjustment || 0) +
    Number(caffeineOffset || 0);
  const remaining = Math.max(0, adjustedGoal - currentIntake);
  const percentage = Math.min(
    100,
    Math.round((currentIntake / adjustedGoal) * 100)
  );

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Generate tooltip based on available offsets
  const tooltipParts = [];
  if (weatherAdjustment > 0)
    tooltipParts.push(`+${weatherAdjustment}ml (weather)`);
  if (caffeineOffset > 0) tooltipParts.push(`+${caffeineOffset}ml (caffeine)`);
  const tooltipText = `Your goal is adjusted by ${tooltipParts.join(" ")}`;

  return (
    <>
      <Box
        sx={{
          mt: 3,
          p: 2,
          borderRadius: 2,
          background: "linear-gradient(to bottom right, #2196f3, #00bcd4)",
          color: "white",
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Today's Hydration
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {formattedDate}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Box>
            <Typography variant="h3" fontWeight="bold">
              {currentIntake}ml
            </Typography>
            <Typography
              variant="body2"
              display="flex"
              alignItems="center"
              gap={0.5}
            >
              of {adjustedGoal}ml
              {(caffeineOffset > 0 || weatherAdjustment > 0) && (
                <>
                  {" "}
                  adjusted goal
                  <Tooltip title={tooltipText}>
                    <InfoOutlinedIcon
                      sx={{
                        fontSize: "1em",
                        verticalAlign: "middle",
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h6" fontWeight="bold">
              {percentage}%
            </Typography>
            <Typography variant="body2">{remaining}ml to go</Typography>
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            my: 1,
            height: 10,
            borderRadius: 5,
            backgroundColor: "rgba(255,255,255,0.2)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "black",
            },
          }}
        />

        {(weatherAdjustment > 0 || caffeineOffset > 0) && (
          <Box display="flex" alignItems="center" gap={2} mt={1}>
            {weatherAdjustment > 0 && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <WbSunnyIcon sx={{ fontSize: "0.8rem" }} />
                <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
                  Weather: +{weatherAdjustment}ml needed
                </Typography>
              </Box>
            )}
            {caffeineOffset > 0 && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <LocalCafeIcon sx={{ fontSize: "0.8rem" }} />
                <Typography variant="caption" sx={{ fontSize: "0.65rem" }}>
                  Caffeine: +{caffeineOffset}ml needed
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Achievements */}
        {unlockedAchievements.length > 0 && (
          <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
            {unlockedAchievements.map((a) => (
              <Chip
                key={a.key}
                label={
                  <Typography sx={{ fontWeight: "bold", fontSize: "0.75rem" }}>
                    {a.title}
                  </Typography>
                }
                icon={a.icon}
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  fontWeight: "bold",
                  px: 0.5,
                  borderRadius: "999px",
                  ".MuiChip-icon": {
                    color: "white",
                    fontSize: 14,
                    ml: "4px",
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* Action buttons */}
        <Box mt={1} display="flex" gap={1}>
          <Button
            startIcon={<RestartAltIcon />}
            sx={{
              color: "white",
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              textTransform: "none",
            }}
            onClick={resetToday}
          >
            Reset Today
          </Button>

          <Button
            startIcon={<LocalCafeIcon />}
            sx={{
              color: "white",
              borderColor: "white",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              textTransform: "none",
            }}
            onClick={handleOpenCaffeineIntake}
          >
            Add Caffeine
          </Button>
        </Box>
      </Box>

      <Modal
        open={openCaffeineIntake}
        onClose={handleCloseCaffeineIntake}
        aria-labelledby="Add Caffeine Intake"
        aria-describedby="Select a preset size or enter a custom amount"
      >
        <CaffeineModal handleClose={handleCloseCaffeineIntake} />
      </Modal>
    </>
  );
};

export default HydrationSummary;
