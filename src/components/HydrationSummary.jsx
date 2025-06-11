import { Box, Typography, LinearProgress, Button, Chip } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useAppContext } from "../context/AppContext";

const HydrationSummary = () => {
  const { baseGoal, hydrationData, resetToday, achievements } = useAppContext();

  const unlockedAchievements = achievements.filter((a) => a.achieved);

  const today = new Date().toISOString().split("T")[0];
  const todayEntry = hydrationData.find((entry) => entry.date === today);
  const currentIntake = todayEntry?.totalIntake || 0;

  const percentage = Math.min(
    100,
    Math.round((currentIntake / baseGoal) * 100)
  );
  const remaining = Math.max(0, baseGoal - currentIntake);

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
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

      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Box>
          <Typography variant="h3" fontWeight="bold">
            {currentIntake}ml
          </Typography>
          <Typography variant="body2">
            of {baseGoal}ml
            {/* <Tooltip title="Your hydration target is adjusted for weather and activity">
        <InfoOutlinedIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
      </Tooltip> */}
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

      {unlockedAchievements.length > 0 && (
        <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
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

      <Box mt={2}>
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
      </Box>
    </Box>
  );
};

export default HydrationSummary;
