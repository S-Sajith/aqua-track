import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  MenuItem,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { caffeineSources } from "../constants/DrinkSources";

const AddCaffeineModal = ({ handleClose }) => {
  const { setHydrationData } = useAppContext();
  const [selected, setSelected] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const theme = useTheme();

  const handleDropdownChange = (e) => {
    const selectedItem = caffeineSources.find(
      (item) => item.label === e.target.value
    );
    setSelected(selectedItem);
    setCustomAmount(selectedItem.amount.toString());
  };

  const logCaffeineIntake = (amount, label = "custom", volume = null) => {
    const caffeineAmount = parseInt(amount);
    if (!caffeineAmount || isNaN(caffeineAmount)) return;

    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newLog = {
      time: currentTime,
      caffeine: caffeineAmount,
      amount: volume, // ml
      type: label?.toLowerCase() || "custom",
      date: currentDate,
    };

    const offset = Math.round(caffeineAmount * 1.2);

    setHydrationData((prevData) => {
      const existingDay = prevData.find((entry) => entry.date === currentDate);

      if (existingDay) {
        const updatedDay = {
          ...existingDay,
          caffeineIntake: (existingDay.caffeineIntake || 0) + caffeineAmount,
          caffeineOffset: (existingDay.caffeineOffset || 0) + offset,
          caffeineLogs: [...(existingDay.caffeineLogs || []), newLog],
        };

        return prevData.map((entry) =>
          entry.date === currentDate ? updatedDay : entry
        );
      } else {
        const newEntry = {
          date: currentDate,
          totalIntake: 0,
          logs: [],
          caffeineIntake: caffeineAmount,
          caffeineOffset: offset,
          caffeineLogs: [newLog],
        };

        return [...prevData, newEntry];
      }
    });

    handleClose();
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        width: {
          xs: "85dvw",
          sm: "60dvw",
          md: "35dvw",
          lg: "30dvw",
          xl: "25dvw",
        },
        height: "fit-content",
        borderRadius: "0.5rem",
        padding: "1rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" } }}
      >
        Add Caffeine Intake
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontWeight="bold"
        sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" } }}
      >
        Select a source or enter a custom amount
      </Typography>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: theme.palette.grey[500],
        }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <Typography
        variant="body2"
        sx={{
          mt: 3,
          mb: 1,
          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" },
        }}
      >
        Caffeine Source
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {caffeineSources.map((item, idx) => (
          <Grid size={{ xs: 4, md: 4 }} key={idx}>
            <Paper
              elevation={selected?.label === item.label ? 4 : 1}
              onClick={() => {
                logCaffeineIntake(item.amount, item.label, item.volume);
              }}
              sx={{
                p: 1.5,
                borderRadius: 2,
                textAlign: "center",
                cursor: "pointer",
                border:
                  selected?.label === item.label
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.divider}`,
                bgcolor:
                  selected?.label === item.label
                    ? theme.palette.primary.light
                    : theme.palette.background.paper,
              }}
            >
              <Box mb={0.5}>{item.icon}</Box>
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.875rem" },
                }}
              >
                {item.label}
              </Typography>

              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: "0.65rem", sm: "0.75rem", md: "0.9rem" },
                }}
              >
                {item.amount}mg
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mb={2}>
        <Typography
          variant="body2"
          mb={1.5}
          sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" } }}
        >
          Custom Caffeine Amount
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <TextField
              label="Source"
              select
              fullWidth
              size="small"
              value={selected?.label || ""}
              onChange={handleDropdownChange}
            >
              <MenuItem value="" disabled>
                Select source
              </MenuItem>
              {caffeineSources.map((item) => (
                <MenuItem key={item.label} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              label="Amount (mg)"
              fullWidth
              variant="outlined"
              size="small"
              type="number"
              placeholder="Enter caffeine in mg"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 1,
          backgroundColor: theme.palette.text.primary,
          color: theme.palette.background.paper,
          textTransform: "none",
          fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
          "&:hover": { backgroundColor: theme.palette.text.secondary },
        }}
        onClick={() =>
          logCaffeineIntake(customAmount, selected?.label, selected?.volume)
        }
      >
        Add Custom Amount
      </Button>
    </Box>
  );
};

export default AddCaffeineModal;
