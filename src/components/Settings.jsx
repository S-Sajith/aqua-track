import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { useAppContext } from "../context/AppContext";

const Settings = ({ handleClose }) => {
  const {
    baseGoal,
    setBaseGoal,
    resetLogs,
    setHydrationData,
    darkMode,
    setDarkMode,
  } = useAppContext();

  const theme = useTheme();

  const handleExport = () => {
    const localHistory = localStorage.getItem("aquatrack_history");

    if (!localHistory) {
      alert("No history found to export.");
      return;
    }

    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const fileName = `aquatrack_backup_${today}.json`;

    const blob = new Blob([localHistory], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
    handleClose();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);

        if (!Array.isArray(imported)) {
          throw new Error("Invalid format. Expected an array.");
        }

        localStorage.setItem("aquatrack_history", JSON.stringify(imported));
        setHydrationData(imported);
        alert("Import successful!");
        handleClose();
      } catch (err) {
        alert("Import failed: Invalid JSON structure.");
      }
    };

    reader.readAsText(file);
  };

  const handleReset = () => {
    const confirm = window.confirm(
      "This will delete all hydration history. Continue?"
    );
    if (confirm) {
      localStorage.removeItem("aquatrack_history");
      resetLogs();
      alert("All hydration data has been reset.");
      handleClose();
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
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
          color: theme.palette.text.secondary,
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
        <Typography variant="body1" color="text.primary">
          Dark Mode
        </Typography>
        <Switch
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
      </Box>

      {/* Data Management */}
      <Typography fontWeight="medium" sx={{ mt: 3 }}>
        Data Management
      </Typography>
      <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExport}
        >
          Export History
        </Button>

        <label htmlFor="import-json">
          <input
            type="file"
            accept=".json"
            id="import-json"
            hidden
            onChange={handleImport}
          />
          <Button
            component="span"
            variant="outlined"
            startIcon={<UploadIcon />}
            sx={{ width: "100%" }}
          >
            Import History
          </Button>
        </label>

        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleReset}
        >
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
