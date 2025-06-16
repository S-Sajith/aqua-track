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
import { useAppContext } from "../context/AppContext";
import CaffeineModal from "./Caffeine/CaffeineModal";
import { useState } from "react";

const HydrationSummary = () => {
  const { baseGoal, hydrationData, resetToday, achievements } = useAppContext();
  const [openCaffeineIntake, setOpenCaffeineIntake] = useState(false);
  const handleOpenCaffeineIntake = () => setOpenCaffeineIntake(true);
  const handleCloseCaffeineIntake = () => setOpenCaffeineIntake(false);

  const unlockedAchievements = achievements.filter((a) => a.achieved);

  const today = new Date().toISOString().split("T")[0];
  const todayEntry = hydrationData.find((entry) => entry.date === today);
  const currentIntake = todayEntry?.totalIntake || 0;

  const caffeineOffset = todayEntry?.caffeineOffset || 0;
  const adjustedGoal = caffeineOffset
    ? parseInt(baseGoal) + caffeineOffset
    : parseInt(baseGoal);
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
              {caffeineOffset > 0 && (
                <>
                  {" "}
                  adjusted goal
                  <Tooltip
                    title={`Your goal is adjusted by +${caffeineOffset}ml (caffeine)`}
                  >
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

        {/* <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
        <WhatshotIcon fontSize="small" /> Weather: +500ml needed
      </Typography> */}

        {/* Caffeine offset info line */}
        {caffeineOffset > 0 && (
          <Box display="flex" alignItems="center" gap={0.5}>
            <LocalCafeIcon sx={{ fontSize: "1rem" }} />
            <Typography
              variant="caption" // smaller than body2
              sx={{ fontSize: "0.75rem" }} // optional: fine-tuned size
            >
              Caffeine: +{caffeineOffset}ml needed
            </Typography>
          </Box>
        )}

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
