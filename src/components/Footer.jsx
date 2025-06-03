import { Box, Divider, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Divider />
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          fontSize: { xs: "0.65rem", sm: "0.75rem" },
        }}
      >
        Built with ❤️ by{" "}
        <Box
          component="a"
          href="https://s-sajith.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Sajith
        </Box>
      </Typography>
    </Box>
  );
};

export default Footer;
