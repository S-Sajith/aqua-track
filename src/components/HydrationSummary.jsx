import {
  Box,
  Typography,
  LinearProgress,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import OpacityIcon from "@mui/icons-material/Opacity";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useAppContext } from "../context/AppContext"; // ⬅️ adjust path if needed

const HydrationSummary = () => {
  const { baseGoal } = useAppContext();
  const currentIntake = 750;

  const percentage = Math.round((currentIntake / baseGoal) * 100);
  const remaining = baseGoal - currentIntake;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
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

      {/* <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
        <Chip label="1 day streak" />
        <Chip label="Hydration Hero" />
        <Chip label="+500ml" />
      </Box> */}

      <Box mt={2}>
        <Button
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
        >
          Reset Today
        </Button>
      </Box>
    </Box>
  );
};

export default HydrationSummary;
