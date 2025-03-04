import { useState } from "react";
import "./App.css";

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

const WeatherCard = ({ weather }) => (
  <div className="weather-card">
    <h2 className="city-name">{weather.city}</h2>
    <p className="temperature">Температура: <span>{weather.temperature}</span></p>
    <p className="description">Описание: <span>{weather.description}</span></p>
    <p className="wind">Ветер: <span>{weather.wind}</span></p>
  </div>
);

const SidebarLeft = ({ onSelectCity }) => (
  <div className="sidebar-left">
    <Button text="Выбрать Нью-Йорк" onClick={() => onSelectCity("New York", "22°C", "Sunny", "10 km/h", "60%", "1015 hPa")} />
    <Button text="Выбрать Лондон" onClick={() => onSelectCity("London", "18°C", "Cloudy", "15 km/h", "70%", "1012 hPa")} />
    <Button text="Выбрать Токио" onClick={() => onSelectCity("Tokyo", "25°C", "Clear", "8 km/h", "65%", "1018 hPa")} />
    <Button text="Выбрать Алмату" onClick={() => onSelectCity("Almaty", "5°C", "Clear", "3km/h", "48%", "1036 hPa")}/>
  </div>
);

const SidebarRight = ({ humidity, pressure }) => (
  <div className="sidebar-right">
    <h3>Дополнительная информация</h3>
    <p>Влажность: <span>{humidity}</span></p>
    <p>Давление: <span>{pressure}</span></p>
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

  const handleSelectCity = (city, temperature, description, wind, humidity, pressure) => {
    setWeather({ city, temperature, description, wind, humidity, pressure });
  };

  return (
    <div className="container">
      <SidebarLeft onSelectCity={handleSelectCity} />
      <div className="main-content">
        <WeatherCard weather={weather} />
      </div>
      <SidebarRight humidity={weather.humidity} pressure={weather.pressure} />
    </div>
  );
};

export default App;
