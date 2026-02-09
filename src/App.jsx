import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Main from "./components/main/Main";
import GlobalStyles from "./core-ui/Globals";
import { ThemeProvider } from "styled-components";
import {
  defaultWeather,
  clouds,
  rain,
  clear,
  thunderstorm,
  snow,
  drizzle,
  mist,
  smoke,
  fog,
  haze,
} from "./core-ui/Themes.styled";

const WEATHER_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [todayWeather, setTodayWeather] = useState({
    name: "",
    country: "",
    temp: "",
    icon: "03d",
    weather: "",
    weatherDesc: "",
    feelsLike: "",
    humidity: "",
    wind: "",
    highest: "",
    lowest: "",
  });

  const [searchedLocation, setSearchedLocation] = useState("Tbilisi");
  const [searchDone, setSearchDone] = useState(false);
  const [theme, setTheme] = useState("clear");
  const [formValue, setFormValue] = useState({ searchedLocation: "" });
  const [formError, setFormError] = useState({});
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------- FORM LOGIC ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validateForm(formValue));
    if (!formValue.searchedLocation) return;
    setSearchedLocation(formValue.searchedLocation);
    setFormValue({ searchedLocation: "" });
  };

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const validateForm = (value) => {
    let errors = {};
    if (!value.searchedLocation) {
      errors.searchedLocation = "Empty field, please add a city name";
    }
    return errors;
  };

  // ---------------- THEME ----------------
  const setWeatherTheme =
    theme === "rain"
      ? rain
      : theme === "clouds"
      ? clouds
      : theme === "clear"
      ? clear
      : theme === "thunderstorm"
      ? thunderstorm
      : theme === "snow"
      ? snow
      : theme === "drizzle"
      ? drizzle
      : theme === "mist"
      ? mist
      : theme === "smoke"
      ? smoke
      : theme === "haze"
      ? haze
      : theme === "fog"
      ? fog
      : defaultWeather;

  // ---------------- FETCH WEATHER ----------------
  useEffect(() => {
    if (!searchedLocation) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setNoData(false);

        // 1️⃣ GEO
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${searchedLocation}&limit=1&appid=${WEATHER_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData.length) {
          setNoData(true);
          setLoading(false);
          return;
        }

        const { lat, lon, name, country } = geoData[0];

        // 2️⃣ WEATHER
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
        );
        const data = await weatherRes.json();

        setTodayWeather({
          name,
          country,
          temp: Math.ceil(data.main.temp),
          icon: data.weather?.[0]?.icon || "03d",
          weather: data.weather?.[0]?.main?.toLowerCase() || "",
          weatherDesc: data.weather?.[0]?.description || "",
          feelsLike: data.main.feels_like,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          highest: data.main.temp_max,
          lowest: data.main.temp_min,
        });

        setSearchDone(true);
      } catch (err) {
        console.error(err);
        setNoData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchedLocation]);

  // ---------------- THEME SWITCH ----------------
  useEffect(() => {
    if (!todayWeather.weather) return;
    setTheme(todayWeather.weather);
  }, [todayWeather.weather]);

  // ---------------- RENDER ----------------
  return (
    <ThemeProvider theme={setWeatherTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                theme={theme}
                noData={noData}
                loading={loading}
                formError={formError}
                formValue={formValue}
                todayWeather={todayWeather}
                handleSubmit={handleSubmit}
                handleValidation={handleValidation}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
