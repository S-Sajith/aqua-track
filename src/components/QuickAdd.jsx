import { Box, Typography, Button, Grid, Paper, Modal } from "@mui/material";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import ScienceIcon from "@mui/icons-material/Science";
import CategoryIcon from "@mui/icons-material/Category";
import OpacityIcon from "@mui/icons-material/Opacity";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import AddIntakeModal from "./AddIntakeModal";

const containers = [
  { label: "Glass", volume: 250, icon: <LocalDrinkIcon color="primary" /> },
  { label: "Small Bottle", volume: 500, icon: <ScienceIcon color="primary" /> },
  {
    label: "Regular Bottle",
    volume: 750,
    icon: <CategoryIcon color="primary" />,
  },
  {
    label: "Large Bottle",
    volume: 1000,
    icon: <OpacityIcon color="primary" />,
  },
];

const QuickAdd = () => {
  const { addLog } = useAppContext();
  const [openAddIntake, setOpenAddIntake] = useState(false);
  const handleOpenAddIntake = () => setOpenAddIntake(true);
  const handleCloseAddIntake = () => setOpenAddIntake(false);

  return (
    <>
      <Box mt={4} p={2} borderRadius={2} boxShadow={2} bgcolor="white">
        <Typography variant="h6" fontWeight="bold">
          Quick Add
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Tap a container to log your water intake
        </Typography>

        <Grid container spacing={2} mt={1}>
          {containers.map((item, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Paper
                elevation={1}
                onClick={() => addLog(item.volume, item.label.toLowerCase())}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { boxShadow: 4 },
                }}
              >
                <Box mb={1}>{item.icon}</Box>
                <Typography variant="body2">{item.label}</Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                  {item.volume}ml
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "black",
            color: "white",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
          onClick={handleOpenAddIntake}
          startIcon={<AddIcon />}
        >
          Add Custom Amount
        </Button>
      </Box>

      <Modal
        open={openAddIntake}
        onClose={handleCloseAddIntake}
        aria-labelledby="Add Intake"
        aria-describedby="Select a preset size or enter a custom amount"
      >
        <AddIntakeModal handleClose={handleCloseAddIntake} />
      </Modal>
    </>
  );
};

export default QuickAdd;
