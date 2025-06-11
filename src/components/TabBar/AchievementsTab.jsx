import { Box, Typography, Grid, Paper, Chip } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { parseISO, differenceInCalendarDays, isSameDay } from "date-fns";

import BoltIcon from "@mui/icons-material/Bolt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SunnyIcon from "@mui/icons-material/Sunny";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import OpacityIcon from "@mui/icons-material/Opacity";

const AchievementsTab = () => {
  const { hydrationData, baseGoal } = useAppContext();

  const today = new Date();
  const sortedData = [...hydrationData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const totalWater = sortedData.reduce((sum, day) => sum + day.totalIntake, 0);
  const daysTracked = sortedData.length;

  // ✅ Tracked streak (3 consecutive days of logging, regardless of goal met)
  let trackedStreak = 1;
  let maxTrackedStreak = 1;

  for (let i = 1; i < sortedData.length; i++) {
    const prevDate = parseISO(sortedData[i - 1].date);
    const currDate = parseISO(sortedData[i].date);

    const dayDiff = differenceInCalendarDays(currDate, prevDate);

    if (dayDiff === 1) {
      trackedStreak++;
      maxTrackedStreak = Math.max(maxTrackedStreak, trackedStreak);
    } else if (dayDiff > 1) {
      trackedStreak = 1; // streak broken
    }
  }

  // ✅ Goal Achiever %
  const todayData = sortedData.find((day) =>
    isSameDay(parseISO(day.date), today)
  );
  const todayGoalPercent = todayData
    ? Math.round((todayData.totalIntake / baseGoal) * 100)
    : 0;

  const goalAchievedToday = todayData?.totalIntake >= baseGoal;

  // ✅ Consistency King (today)
  const todayLogs =
    sortedData.find((day) => isSameDay(parseISO(day.date), today))?.logs || [];
  const consistencyProgress = Math.min(todayLogs.length, 5);

  // ✅ Early Bird
  const earlyBird = todayLogs.some((log) => {
    const [time, meridian] = log.time.split(" ");
    const [hour] = time.split(":");
    const hour24 = meridian === "PM" && +hour < 12 ? +hour + 12 : +hour;
    return hour24 < 9;
  });

  const achievementCards = [
    {
      title: "Streak Master",
      description: "Maintain a 3-day streak",
      progress: `${Math.min(maxTrackedStreak, 3)}/3 days`,
      achieved: maxTrackedStreak >= 3,
      icon: <BoltIcon fontSize="medium" />,
    },
    {
      title: "Goal Achiever",
      description: "Reach your daily goal",
      progress: `${todayGoalPercent}%`,
      achieved: !!goalAchievedToday,
      icon: <EmojiEventsIcon fontSize="medium" />,
    },
    {
      title: "Early Bird",
      description: "Drink water before 9 AM",
      progress: earlyBird ? "✔️" : "Not yet",
      achieved: earlyBird,
      icon: <SunnyIcon fontSize="medium" />,
    },
    {
      title: "Consistency King",
      description: "Drink 5+ times in a day",
      progress: `${consistencyProgress}/5 times`,
      achieved: consistencyProgress >= 5,
      icon: <CalendarTodayIcon fontSize="medium" />,
    },
    {
      title: "Hydration Hero",
      description: "Drink 150% of your daily goal",
      progress: `${todayGoalPercent}%`,
      achieved: todayGoalPercent >= 150,
      icon: <OpacityIcon fontSize="medium" />,
    },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Your Achievements
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Track your hydration milestones and earn badges
      </Typography>

      <Grid container spacing={2}>
        {achievementCards.map((ach, i) => (
          <Grid size={{ xs: 6, md: 3 }} key={i}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 2,
                bgcolor: ach.achieved ? "#E8F0FE" : "#FFFFFF",
                color: ach.achieved ? "#4285F4" : "text.primary",
                border: ach.achieved
                  ? "1px solid #4285F4"
                  : "1px solid #E0E0E0",
              }}
            >
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                  color: ach.achieved ? "primary.main" : "grey.400",
                }}
              >
                {ach.icon}
              </Box>
              <Typography fontWeight="bold" variant="body2">
                {ach.title}
              </Typography>
              <Typography variant="body2" mb={1}>
                {ach.description}
              </Typography>
              {ach.achieved ? (
                <Chip
                  label="Unlocked"
                  sx={{
                    bgcolor: "#000000",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    px: 1.5,
                  }}
                />
              ) : (
                <Chip
                  label={ach.progress}
                  size="small"
                  variant="outlined"
                  sx={{
                    mt: 1,
                  }}
                />
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Lifetime Stats */}
      <Box display="flex" flexWrap="wrap" mt={4} gap={2}>
        <Stat label="Total Water" value={`${totalWater}ml`} />
        <Stat label="Days Tracked" value={daysTracked} />
        <Stat label="Best Streak" value={`${maxTrackedStreak} days`} />
        {/* <Stat label="Goals Met" value={goalMetDays} /> */}
      </Box>
    </Box>
  );
};

const Stat = ({ label, value }) => (
  <Box
    sx={{
      minWidth: 120,
      p: 2,
      borderRadius: 2,
      bgcolor: "#f9f9f9",
      textAlign: "center",
    }}
  >
    <Typography fontWeight="bold">{value}</Typography>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

export default AchievementsTab;
