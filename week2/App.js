import { useState, useEffect, createContext, useContext } from "react";
import "./App.css";

const WeatherContext = createContext();
const API_KEY = "4c8ebd9fad932b4343acdc6ca78f687c";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const WeatherCard = ({ weather }) => (
  <div className="weather-card">
    <h2 className="city-name">{weather.city}</h2>
    <p className="temperature">Температура: <span>{weather.temperature}</span></p>
    <p className="description">Описание: <span>{weather.description}</span></p>
    <p className="wind">Ветер: <span>{weather.wind}</span></p>
  </div>
);

const SidebarLeft = ({ onSelectCity }) => {
  const [city, setCity] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSelectCity(city);
    }
  };

  return (
    <div className="sidebar-left">
      <form onSubmit={handleSubmit} className="search-form">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Введите город"
          className="search-input"
        />
        <button type="submit" className="search-button">🔍 Искать</button>
      </form>
    </div>
  );
};

const SidebarRight = ({ humidity, pressure }) => (
  <div className="sidebar-right">
    <h3>Дополнительная информация</h3>
    <p>Влажность: <span>{humidity}</span></p>
    <p>Давление: <span>{pressure}</span></p>
  </div>
);

const BottomBox = () => (
  <div className="bottom-box">
    <h3>Советы по погоде</h3>
    <p>Одевайтесь по погоде и проверяйте прогноз перед выходом!</p>
  </div>
);

const ForecastBox = ({ forecast }) => (
  <div className="forecast-box">
    <h3>Прогноз на 3 дня</h3>
    <ul>
      {forecast.map((day, index) => (
        <li key={index}>
          <strong>{day.date}</strong>: {day.temp}°C, {day.description}
        </li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [weather, setWeather] = useState({
    city: "New York",
    temperature: "22°C",
    description: "Sunny",
    wind: "10 km/h",
    humidity: "60%",
    pressure: "1015 hPa",
  });
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`);
      if (!response.ok) throw new Error("Город не найден");
      const data = await response.json();
      setWeather({
        city: data.name,
        temperature: `${data.main.temp}°C`,
        description: data.weather[0].description,
        wind: `${data.wind.speed} м/с`,
        humidity: `${data.main.humidity}%`,
        pressure: `${data.main.pressure} hPa`,
      });
      setForecast([
        { date: "Завтра", temp: data.main.temp - 2, description: "Облачно" },
        { date: "Послезавтра", temp: data.main.temp - 1, description: "Дождь" },
        { date: "Через 3 дня", temp: data.main.temp, description: "Солнечно" }
      ]);
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <WeatherContext.Provider value={{ weather, handleSelectCity: fetchWeather }}>
      <div className="container">
        <SidebarLeft onSelectCity={fetchWeather} />
        <div className="main-content">
          {loading ? <p>Загружается...</p> : <WeatherCard weather={weather} />}
        </div>
        <SidebarRight humidity={weather.humidity} pressure={weather.pressure} />
        <ForecastBox forecast={forecast} />
        <BottomBox />
      </div>
    </WeatherContext.Provider>
  );
};

export default App;
