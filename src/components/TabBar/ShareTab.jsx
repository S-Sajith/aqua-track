import { Box, Button, Typography, Chip, useTheme } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { isSameDay, parseISO } from "date-fns";

const ShareTab = () => {
  const theme = useTheme();
  const { hydrationData, baseGoal, achievements } = useAppContext();
  const [copied, setCopied] = useState(false);

  const today = new Date();
  const todayData = hydrationData.find((d) =>
    isSameDay(parseISO(d.date), today)
  );
  const todayIntake = todayData?.totalIntake || 0;
  const percentage = baseGoal ? Math.round((todayIntake / baseGoal) * 100) : 0;

  const earnedAchievements = achievements.filter((a) => a.achieved);

  // Construct share text dynamically
  const achievementSentences = earnedAchievements.map(
    (a) => `🏅 ${a.title}: ${a.description}.`
  );

  const shareText = [
    `💧 I've tracked ${todayIntake}ml of water today with AquaTrack!`,
    `That’s ${percentage}% of my daily goal.`,
    "",
    earnedAchievements.length > 0
      ? "🏆 Achievements unlocked today:\n" + achievementSentences.join("\n")
      : "No achievements unlocked today — but I'm staying consistent!",
    "",
    "Stay hydrated, friends! 🧃",
    "Track your water intake too at https://aqua-track-app.netlify.app/",
  ].join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Box p={2}>
      <Typography variant="h6" fontWeight="bold" mb={0.5}>
        Share Your Progress
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Let others know about your hydration journey
      </Typography>

      {/* Share Text Box */}
      <Box
        sx={{
          bgcolor:
            theme.palette.mode === "dark"
              ? theme.palette.action.selected
              : "#e6f0ff",
          borderRadius: 2,
          p: 2,
          mb: 2,
          whiteSpace: "pre-line",
          fontSize: "14px",
          color: theme.palette.text.primary,
        }}
      >
        {shareText}
      </Box>

      {/* Copy Button */}
      <Box display="flex" flexDirection="column" gap={1} mb={3}>
        <Button
          onClick={handleCopy}
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: theme.palette.text.primary,
            color: theme.palette.background.paper,
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: theme.palette.text.secondary,
            },
          }}
          startIcon={<ContentCopy />}
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </Box>

      {/* Achievements Chips */}
      {earnedAchievements.length > 0 && (
        <>
          <Typography variant="body2" mb={1}>
            Achievements to Share
          </Typography>
          <Box
            display="flex"
            gap={1}
            flexWrap="wrap"
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.paper
                  : "#f9f9f9",
              borderRadius: 2,
              p: 1,
            }}
          >
            {earnedAchievements.map((a) => (
              <Chip
                key={a.key}
                icon={a.icon}
                label={`${a.title} (${a.progress})`}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ShareTab;
