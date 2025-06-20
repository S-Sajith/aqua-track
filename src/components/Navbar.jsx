import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton, Modal, useTheme } from "@mui/material";
import logo from "../assets/aquatrack.png";
import { useState } from "react";
import Settings from "./Settings";

const Navbar = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  const theme = useTheme();

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.6dvh",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "1.2rem" }} />
        <IconButton
          sx={{
            padding: "0",
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
          }}
          size="small"
          onClick={handleOpenSettings}
        >
          <SettingsOutlinedIcon
            sx={{ fontSize: "1.2rem", color: theme.palette.text.primary }}
          />
        </IconButton>
      </nav>

      <Modal
        open={openSettings}
        onClose={handleCloseSettings}
        aria-labelledby="Settings"
        aria-describedby="Customize your hydration tracking experience"
      >
        <Settings handleClose={handleCloseSettings} />
      </Modal>
    </>
  );
};

export default Navbar;
