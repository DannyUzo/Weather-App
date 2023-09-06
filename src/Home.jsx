import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ReactComponent as Sun } from "./DarkMode/DarkMode/Sun.svg";
import { ReactComponent as Moon } from "./DarkMode/DarkMode/Moon.svg";
import "./DarkMode/DarkMode/DarkMode";
import axios from "axios";

export const ThemeContext = createContext(null);

export default function Home() {
  const [data, setData] = useState({
    celcius: 0,
    name: "--",
    Humidity: 0,
    Icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    text: "--",
    speed: 0,
    time: "00:00:00",
  });
  const [currName, setcurrName] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (currName !== "") {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=7958fa67b67340368ea193442230509&q=${currName}&aqi=yes`;
      axios
        .get(apiUrl)
        .then((res) => {
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.current.temp_c,
            text: res.data.current.condition.text,
            name: res.data.location.name,
            Icon: res.data.current.condition.icon,
            Humidity: res.data.current.humidity,
            speed: res.data.current.wind_kph,
            time: res.data.location.localtime,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.data.error.code === 1006) {
            setError("No matching location found");
          } else {
            setError("");
          }
          console.log(err);
        });
    }
  };
  const [theme, setTheme] = useState("dark");
const toggleTheme = () =>{
  setTheme((curr) => (curr === "dark" ? "light" : "dark"));
}

useEffect(() =>{
  const data = window.localStorage.getItem("Curr_Theme");
 if(data !== "dark") setTheme((data))
},[]);

 useEffect(() =>{
  window.localStorage.setItem("Curr_Theme", (theme))
 },[theme])

return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div id={theme}>
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <h2>WeatherVista</h2>
            </div>
            <div className="search">
              <input
                type="text"
                placeholder="Enter the name of your Town, City or Region"
                onChange={(e) => setcurrName(e.target.value)}
              />
              <button onClick={handleSearch}>
                <i class="fi fi-rr-search"></i>
              </button>
            </div>
            <div className="ThemeSwitch">
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                checked={theme === 'dark'}
                
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
            </div>
          </div>
          <div className="main">
            <div className="weather">
              <div className="header">
                <h2>Live Update</h2>
              </div>
              <div className="error">
                <p>{error}</p>
              </div>
              <div className="weatherInfo">
                <img src={data.Icon} alt="weather" />
                <h4>{data.text}</h4>
                <h1>{data.celcius}°c</h1>
                <h5>{data.name}</h5>
                <div className="details">
                  <div className="col">
                    <i class="fi fi-rs-humidity"></i>
                    <div className="humidity">
                      <h3>{data.Humidity}%</h3>
                      <p>Humidity</p>
                    </div>
                  </div>
                  <div className="col">
                    <i class="fi fi-rr-wind"></i>
                    <div className="wind">
                      <h3>{data.speed}km/h</h3>
                      <p>Wind speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
