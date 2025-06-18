import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { containers } from "../constants/DrinkSources";

const AddIntakeModal = ({ handleClose }) => {
  const { addLog } = useAppContext();
  const [selected, setSelected] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const theme = useTheme();

  const handleSubmit = () => {
    const amount = selected?.volume || parseInt(customAmount);
    const label = selected?.label.toLowerCase() || "custom";

    if (amount > 0) {
      addLog(amount, label);
      handleClose();
      setSelected(null);
      setCustomAmount("");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        width: {
          xs: "85dvw", // xs = extra small (mobile)
          sm: "60dvw", // sm = small (tablets)
          md: "35dvw", // md = medium (small laptops)
          lg: "30dvw", // lg = large (desktops)
          xl: "25dvw", // xl = extra large screens
        },
        height: "fit-content",
        borderRadius: "0.5rem",
        padding: "1rem",
        // Center the modal
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
        Add Water Intake
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        fontWeight="bold"
        sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" } }}
      >
        Select a preset size or enter a custom amount
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
        Container type
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {containers.map((item, idx) => (
          <Grid size={{ xs: 4, md: 4 }} key={idx}>
            <Paper
              elevation={selected?.label === item.label ? 4 : 1}
              onClick={() => {
                setSelected(item);
                setCustomAmount("");
              }}
              sx={{
                height: "fit-content",
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
                {item.volume}ml
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={2}>
        <Typography
          variant="body2"
          mb={0.5}
          sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.875rem" } }}
        >
          Custom Amount (ml)
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          type="number"
          placeholder="Enter amount in ml"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelected(null);
          }}
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: theme.palette.text.primary,
          color: theme.palette.background.paper,
          textTransform: "none",
          fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
          "&:hover": {
            backgroundColor: theme.palette.text.secondary,
          },
        }}
        onClick={handleSubmit}
      >
        Add {selected?.volume || customAmount || ""}ml
      </Button>
    </Box>
  );
};

export default AddIntakeModal;
