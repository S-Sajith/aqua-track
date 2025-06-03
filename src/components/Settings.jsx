import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  Divider,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "../context/AppContext";

const Settings = ({ handleClose }) => {
  const { baseGoal, setBaseGoal } = useAppContext();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: {
          xs: "80dvw", // xs = extra small (mobile)
          sm: "55dvw", // sm = small (tablets)
          md: "30dvw", // md = medium (small laptops)
          lg: "25dvw", // lg = large (desktops)
          xl: "20dvw", // xl = extra large screens
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
      <Typography variant="h6" fontWeight="bold">
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" fontWeight="bold">
        Customize your hydration tracking experience
      </Typography>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "grey.500",
        }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      {/* Daily Water Goal */}
      <Typography fontWeight="medium" sx={{ mt: 2 }}>
        Daily Water Goal
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
        <TextField
          size="small"
          type="number"
          value={baseGoal}
          sx={{ width: 100 }}
          onChange={(e) => setBaseGoal(Number(e.target.value))}
        />
        <Typography>ml</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setBaseGoal(2000)}
        >
          Reset to Default
        </Button>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
        Recommended: 2000ml for adults
      </Typography>

      {/* App Appearance */}
      <Typography fontWeight="medium" sx={{ mt: 3 }}>
        App Appearance
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 0.5,
        }}
      >
        <Typography variant="body1" color="textPrimary">
          Dark Mode
        </Typography>
        <Switch />
      </Box>

      {/* Data Management */}
      <Typography fontWeight="medium" sx={{ mt: 3 }}>
        Data Management
      </Typography>
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Button variant="outlined" startIcon={<DownloadIcon />}>
          Export History
        </Button>
        <Button variant="outlined" startIcon={<UploadIcon />}>
          Import History
        </Button>
        <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
          Reset All Data
        </Button>
      </Box>

      {/* About */}
      <Divider sx={{ mt: 2 }} />
      <Typography fontWeight="medium">About Aquatrack</Typography>
      <Typography variant="body2" color="text.secondary">
        Version 1.0.0 • Built with{" "}
        <FavoriteIcon
          fontSize="small"
          sx={{ color: "red", verticalAlign: "middle" }}
        />{" "}
        for better hydration
      </Typography>
    </Box>
  );
};

export default Settings;
