import { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Typography, Button, CircularProgress, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useAppContext } from "../context/AppContext";

const WEATHER_API_KEY = "c921c73f2b6ca6157c8af5fd2c00d452";

const WeatherBasedHydration = () => {
  const { baseGoal, setWeatherAdjustment } = useAppContext();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback((lat, lon) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const weatherObj = {
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          location: data.name,
          icon: data.weather[0].icon,
          fetchTime: new Date().toISOString(),
        };
        localStorage.setItem("aquatrack_weather", JSON.stringify(weatherObj));
        setWeather(weatherObj);
      })
      .finally(() => setLoading(false));
  }, []);

  const enableLocation = useCallback(() => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(
      (position) =>
        fetchWeather(position.coords.latitude, position.coords.longitude),
      () => alert("Permission denied")
    );
  }, [fetchWeather]);

  useEffect(() => {
    const saved = localStorage.getItem("aquatrack_weather");
    if (saved) {
      setWeather(JSON.parse(saved));
    }
  }, []);

  const adjustment = useMemo(() => {
    if (!weather) return 0;
    let adj = 0;
    if (weather.temperature > 30) adj += 500;
    else if (weather.temperature >= 25) adj += 250;
    if (weather.humidity > 80) adj += 250;
    return adj;
  }, [weather]);

  useEffect(() => {
    setWeatherAdjustment(adjustment);
  }, [adjustment, setWeatherAdjustment]);

  const total = useMemo(
    () => Number(baseGoal) + adjustment,
    [baseGoal, adjustment]
  );

  if (loading)
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (!weather) {
    return (
      <Box
        sx={{
          mt: 2,
          p: 3,
          borderRadius: 2,
          background: "#fff",
          boxShadow: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Weather-Based Hydration
        </Typography>
        <Typography color="text.secondary" fontSize="0.9rem">
          Your hydration needs change with the weather
        </Typography>
        <Box mt={3}>
          <LocationOnIcon fontSize="large" color="primary" />
        </Box>
        <Typography mt={1}>
          Enable location to get weather-based recommendations
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, background: "black" }}
          onClick={enableLocation}
        >
          Enable Location
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        p: 3,
        borderRadius: 2,
        background: "#fff",
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Weather-Based Hydration
      </Typography>
      <Typography color="text.secondary" fontSize="0.9rem">
        Your hydration needs change with the weather
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <Box
          sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: "50%",
            padding: "0.3rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
          }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather"
            style={{ width: "2.5rem", height: "2.5rem" }}
          />
        </Box>

        <Box>
          <Typography fontWeight="bold" fontSize="1.2rem">
            {weather.temperature}°C
          </Typography>
          <Typography fontSize="0.85rem">
            {weather.condition}, {weather.humidity}% humidity
          </Typography>
        </Box>
        <Box flexGrow={1} />
        <Chip
          icon={<LocationOnIcon />}
          label={weather.location}
          variant="outlined"
          size="small"
          sx={{
            ".MuiChip-label": {
              textTransform: "none",
              fontSize: "0.9rem",
              fontWeight: "bold",
            },
            padding: "0.2rem",
            ".MuiChip-icon": {
              fontSize: "1rem",
            },
          }}
        />
      </Box>

      {/* Horizontal hydration values */}
      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="0.9rem" color="text.secondary">
            Base hydration goal
          </Typography>
          <Typography>{baseGoal}ml</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="0.9rem" color="text.secondary">
            Weather adjustment
          </Typography>
          <Typography color="primary">+{adjustment}ml</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="0.9rem" fontWeight="bold">
            Weather-adjusted goal
          </Typography>
          <Typography fontWeight="bold">{total}ml</Typography>
        </Box>
      </Box>

      {/* Weather Impact */}
      <Box mt={2}>
        <Typography fontWeight="bold" fontSize="0.9rem">
          Weather Impact
        </Typography>
        {weather.temperature > 30 && (
          <Box
            display="flex"
            alignItems="center"
            color="error.main"
            fontSize="0.85rem"
            mb={1}
          >
            <ThermostatIcon sx={{ fontSize: "0.8rem", mr: 0.5, mb: 0.15 }} />
            <Typography fontSize="0.85rem">
              High temperature increases water loss through sweat
            </Typography>
          </Box>
        )}

        {weather.humidity > 80 && (
          <Box
            display="flex"
            alignItems="center"
            color="primary.main"
            fontSize="0.85rem"
          >
            <WaterDropIcon sx={{ fontSize: "0.8rem", mr: 0.5, mb: 0.15 }} />
            <Typography fontSize="0.85rem">
              High humidity reduces sweat evaporation
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WeatherBasedHydration;
