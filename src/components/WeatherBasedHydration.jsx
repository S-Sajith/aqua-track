import { useEffect, useState, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  useTheme,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useAppContext } from "../context/AppContext";

const WEATHER_API_KEY = "f03dedaa448d34090c2a170b64bf2a95";

const WeatherBasedHydration = () => {
  const { baseGoal, setWeatherAdjustment } = useAppContext();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

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
      const parsed = JSON.parse(saved);
      const lastFetchedDate = new Date(parsed.fetchTime);
      const today = new Date();

      const isSameDayFetch =
        lastFetchedDate.getFullYear() === today.getFullYear() &&
        lastFetchedDate.getMonth() === today.getMonth() &&
        lastFetchedDate.getDate() === today.getDate();

      if (isSameDayFetch) {
        // If fetched today, just use saved
        setWeather(parsed);
      } else {
        // Needs refetch – check location permission
        navigator.permissions
          .query({ name: "geolocation" })
          .then((result) => {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(
                (position) =>
                  fetchWeather(
                    position.coords.latitude,
                    position.coords.longitude
                  ),
                () => {
                  alert("Unable to fetch location, please check permissions.");
                }
              );
            } else {
              // Permission revoked or not granted — prompt user again
              alert(
                "Location permission is required to update weather-based hydration recommendations."
              );
            }
          })
          .catch(() => {
            // Fallback if Permissions API fails
            alert(
              "We couldn't verify your location permission. Please enable location access to update weather-based hydration."
            );
          });
      }
    }
  }, [fetchWeather]);

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
          background: theme.palette.background.paper,
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
          sx={{ mt: 2, backgroundColor: theme.palette.text.primary }}
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
        background: theme.palette.background.paper,
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
            backgroundColor: theme.palette.background.paper,
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
      {(weather.temperature > 30 || weather.humidity > 80) && (
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
      )}
    </Box>
  );
};

export default WeatherBasedHydration;
