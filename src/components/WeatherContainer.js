import React, { useState } from "react";
import "../styles/weather.css";
import WeatherInfo from "./WeatherInfo";
import { MY_KEY } from "../config.js";

function WeatherContainer() {
  const API_KEY = MY_KEY;
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: null,
    humidity: null,
    desc: null,
    city: null,
  });
  const [isValidZipCode, setIsValidZipCode] = useState(true);

  const updateSearchQuery = (event) => {
    let zipCode = event.target.value;
    let isValid = validateZipCode(zipCode);
    setSearchQuery(zipCode);

    if (isValid || zipCode === "" || isValid.length === 5) {
      setIsValidZipCode(true);
    } else {
      setIsValidZipCode(false);
    }
  };

  const validateZipCode = (zipCode) => {
    let regex = /[0-9]{5}/;
    return regex.test(zipCode);
  };

  const getWeatherData = () => {
    if (!isValidZipCode || searchQuery === "") {
      return;
    }
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${searchQuery},us&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherData({
          temp: convertToFahrenheit(data.main.temp),
          humidity: data.main.humidity,
          desc: data.weather[0].main,
          city: data.name,
        });
      });
  };

  const convertToFahrenheit = (temp) => {
    return ((temp - 273.15) * (9.0 / 5.0) + 32).toFixed(0);
  };

  return (
    <section className="weather-container">
      <header className="weather-header">
        <h3>Weather</h3>
        <div>
          <input
            placeholder="Zip Code"
            className="search-input"
            onChange={updateSearchQuery}
            maxLength="5"
          />
          <button onClick={getWeatherData} className="material-icons">
            search
          </button>
        </div>
      </header>
      <p className="error">{isValidZipCode ? "" : "Invalid Zip Code"}</p>
      <section className="weather-info">
        {weatherData.temp === null ? (
          <p>
            No weather to display.<i className="material-icons">wb_sunny</i>
          </p>
        ) : (
          <WeatherInfo data={weatherData} />
        )}
      </section>
    </section>
  );
}

export default WeatherContainer;
