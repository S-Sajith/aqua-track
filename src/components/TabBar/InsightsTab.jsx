import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AlarmIcon from "@mui/icons-material/Alarm";
import { parse, getHours } from "date-fns";

const InsightsTab = () => {
  const { hydrationData, baseGoal } = useAppContext();

  const weeklyData = hydrationData.slice(-7);
  const total = weeklyData.reduce((sum, day) => sum + day.totalIntake, 0);
  const averageDaily = Math.round(total / 7);
  const percent = Math.min((averageDaily / baseGoal) * 100, 100);

  const hydrationScoreLabel =
    percent < 40
      ? "Needs Improvement"
      : percent < 80
      ? "Getting There"
      : "Great";

  // Best time logic: find the most frequent 2-hour window
  const timeBuckets = {};

  weeklyData.forEach((day) => {
    day.logs.forEach((log) => {
      const hour = getHours(parse(log.time, "hh:mm a", new Date()));
      const bucket = `${hour}-${hour + 2}`;
      timeBuckets[bucket] = (timeBuckets[bucket] || 0) + 1;
    });
  });

  const rawBucket = Object.entries(timeBuckets).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];

  const formatHour = (hour) => {
    const h = hour % 12 || 12;
    const suffix = hour < 12 ? "AM" : "PM";
    return `${h} ${suffix}`;
  };

  const bestBucket = rawBucket
    ? (() => {
        const [start, end] = rawBucket.split("-").map(Number);
        return `${formatHour(start)}–${formatHour(end)}`;
      })()
    : "N/A";

  // Dynamic recommendations
  const recommendations = [];

  if (averageDaily < baseGoal) {
    recommendations.push({
      icon: <WaterDropIcon color="primary" />,
      text: `Increase intake by ${Math.max(
        baseGoal - averageDaily,
        0
      )}ml to reach your daily goal`,
    });
  }

  if (weeklyData.length < 7) {
    recommendations.push({
      icon: <CalendarTodayIcon color="primary" />,
      text: "Maintain consistency to build your hydration streak",
    });
  }

  const afternoonLogs = weeklyData
    .flatMap((day) => day.logs)
    .filter((log) => {
      const hour = getHours(parse(log.time, "hh:mm a", new Date()));
      return hour >= 12 && hour < 17;
    });

  if (afternoonLogs.length < 3) {
    recommendations.push({
      icon: <AlarmIcon color="primary" />,
      text: "Set reminders for afternoon hydration",
    });
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Hydration Insights
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Your personalized hydration analysis
      </Typography>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Average Daily
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {averageDaily}ml
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {Math.round(percent)}% this week
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="caption" color="text.secondary">
            Best Time
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {bestBucket.replace("-", "–")} {/* e.g., 6–8 */}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Most consistent
          </Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
        mb={1}
      >
        <Typography variant="body1" fontWeight="bold">
          Hydration Score
        </Typography>
        <Chip
          label={hydrationScoreLabel}
          color="error"
          size="small"
          variant="outlined"
        />
      </Box>

      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{ height: 8, borderRadius: 4 }}
      />

      <Typography mt={3} mb={1}>
        Recommendations
      </Typography>
      <List dense>
        {recommendations.map((rec, idx) => (
          <ListItem key={idx}>
            <ListItemIcon sx={{ minWidth: "2rem" }}>{rec.icon}</ListItemIcon>
            <ListItemText primary={rec.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default InsightsTab;
