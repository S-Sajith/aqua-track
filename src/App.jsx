import HydrationSummary from "./components/HydrationSummary";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        width: {
          xs: "100dvw", // full width on mobile
          md: "80dvw", // 80% of viewport width on medium+ screens
        },
        margin: "0 auto",
        mt: 2,
      }}
    >
      <Navbar />
      <Box
        sx={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <HydrationSummary />
      </Box>
    </Box>
  );
}

export default App;
