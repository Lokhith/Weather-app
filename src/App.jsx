import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = 'c14957fe58681790fb180bc21d254ee6';

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    setError('');
    setWeather(null);
    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
          setError('City not found');
          setLoading(false);
          return;
        }

        setWeather(data);
      } catch {
        setError('Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="app-container">
      <div className="left-panel">
        <div className="app-heading">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
            alt="Weather Icon"
            className="heading-icon"
          />
          <h1>Weather App</h1>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>Search</button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="right-panel">
        {loading ? (
          <div className="spinner-wrapper">
            <img src="../src/assets/wheel-logo.jpg" alt="Loading..." className="spinner" />
          </div>
        ) : weather ? (
          <div className="weather-box">
            <img
              src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
              alt="weather-icon"
            />
            <h2>{weather.name}</h2>
            <h3>{weather.main.temp}°C</h3>
            <p>{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} km/h</p>
          </div>
        ) : (
          <div className="placeholder-text">Search a city to see weather details</div>
        )}
      </div>
    </div>
  );
}

export default App;
