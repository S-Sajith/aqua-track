import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Modal,
  Grid,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { useState, cloneElement } from "react";
import CaffeineModal from "../CaffeineModal";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import { caffeineSources } from "../../constants/DrinkSources";
import { useTheme } from "@mui/material/styles";

const CaffeineTab = () => {
  const { hydrationData } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();

  const today = new Date().toISOString().split("T")[0];
  const todayEntry = hydrationData.find((entry) => entry.date === today);

  const caffeineLogs = todayEntry?.caffeineLogs || [];
  const caffeineIntake = todayEntry?.caffeineIntake || 0;
  const caffeineOffset = todayEntry?.caffeineOffset || 0;

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box mt={2}>
      {/* Top Box */}
      <Box
        p={3}
        borderRadius={2}
        boxShadow={4}
        bgcolor={theme.palette.background.paper}
        mb={3}
      >
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Caffeine Offset Calculator
        </Typography>
        <Typography variant="body2" mb={2}>
          Track how caffeine affects your hydration needs
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {caffeineIntake}mg
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {caffeineIntake < 400 ? "Low intake" : "High intake"}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {caffeineOffset}ml
            </Typography>
            <Typography variant="body2" color="text.secondary">
              To offset dehydration
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          startIcon={<LocalCafeIcon />}
          onClick={handleOpen}
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#000",
            color: theme.palette.mode === "dark" ? "#000" : "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark" ? "#ddd" : "#333",
            },
          }}
        >
          Add Caffeine Intake
        </Button>

        {/* Caffeine Log */}
        {caffeineLogs.length > 0 && (
          <>
            <Typography variant="subtitle2" mt={3} mb={1}>
              Today’s Caffeine Log
            </Typography>
            {caffeineLogs.map((log, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1.5}
                borderRadius={1}
                bgcolor={
                  theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : "#f9f9f9"
                }
                mb={1}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  {cloneElement(
                    caffeineSources.find(
                      (source) =>
                        source.label.toLowerCase() === log.type?.toLowerCase()
                    )?.icon || <LocalCafeIcon color="primary" />,
                    { sx: { fontSize: "1.2rem" } }
                  )}

                  <Typography variant="body2" textTransform={"capitalize"}>
                    {log.type || "Caffeine"}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="caption">{log.time}</Typography>
                  <Chip
                    label={`${log.caffeine}mg`}
                    size="small"
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* Info Box */}
      <Box
        p={3}
        borderRadius={2}
        boxShadow={4}
        bgcolor={theme.palette.background.paper}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          How Caffeine Affects Hydration
        </Typography>
        <Typography variant="body2" gutterBottom>
          Caffeine is a diuretic that can increase fluid loss through urination,
          potentially leading to dehydration if not properly offset with
          additional water intake.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Caffeine Content in Common Drinks
        </Typography>

        <Grid container spacing={2} mt={2}>
          {caffeineSources.map((source, index) => (
            <Grid key={index} size={{ xs: 6, md: 4 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark" ? "#1e3d3a" : "#e0f2f1",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cloneElement(source.icon, {
                    sx: { fontSize: "1rem" },
                  })}
                </Box>

                <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                  {source.label}:{" "}
                  <Box component="span" fontWeight="bold">
                    {source.amount}mg
                  </Box>{" "}
                  ({source.volume}ml)
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Hydration Offset Guidelines
        </Typography>
        <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
          <li>
            <Typography variant="body2">
              For every 1mg of caffeine, drink approximately 1–1.5ml of
              additional water
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              A cup of coffee (95mg) requires about 120ml of extra water
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Daily caffeine intake under 400mg is generally considered safe for
              most adults
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Spread your caffeine intake throughout the day for better
              hydration
            </Typography>
          </li>
        </ul>

        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          mt={2}
        >
          Note: This calculator provides general guidelines. Individual
          responses to caffeine vary based on tolerance, body weight, and other
          factors.
        </Typography>
      </Box>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="Add Caffeine Intake"
        aria-describedby="Select a preset size or enter a custom amount"
      >
        <CaffeineModal handleClose={handleClose} />
      </Modal>
    </Box>
  );
};

export default CaffeineTab;
