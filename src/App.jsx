import HydrationSummary from "./components/HydrationSummary";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import QuickAdd from "./components/QuickAdd";
import Footer from "./components/Footer";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100dvw",
            md: "80dvw",
          },
          margin: "0 auto",
          mt: 2,
          flexGrow: 1, // take up all available space
        }}
      >
        <Navbar />
        <Box
          sx={{
            px: "1rem",
          }}
        >
          <HydrationSummary />
          <QuickAdd />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
