import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ReactComponent as Sun } from "./DarkMode/DarkMode/Sun.svg";
import { ReactComponent as Moon } from "./DarkMode/DarkMode/Moon.svg";
import Map from "./Assets/map.png";
import Clouds from './Assets/Clouds.png';
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
    latitude: "--",
    longitude: "--",
    country: "--",
    region: "--",
    tz_id: "--",
    Avg_tempC:"0",
    Avg_tempF:"0",
    Avg_Humidity:'0',
    Pressure:"0",
    UV:"0",
    CO:"0",
    NO2:"0",
    O3:"0",
    GB_index: "--",
    US_index:"--",
    pm2:"0",
    pm10:"0",
    so2:"0",
    chance_of_rain:'0',
    chance_of_snow:'0',
    precipitation: "--",
    Forecast_Time_text1: "--",
    Forecast_Time_icon1: "--",
    Forecast_Time_temp_c1: "0",
    Forecast_Time_text2: "--",
    Forecast_Time_icon2: "--",
    Forecast_Time_temp_c2: "0",
    Forecast_Time_text3: "--",
    Forecast_Time_icon3: "--",
    Forecast_Time_temp_c3: "0",
  });
  const [currName, setcurrName] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (currName !== "") {
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=7958fa67b67340368ea193442230509&q=${currName}&days=1&aqi=yes&alerts=yes`;
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
            latitude: res.data.location.lat,
            longitude: res.data.location.lon,
            country: res.data.location.country,
            region: res.data.location.region,
            tz_id: res.data.location.tz_id,
            Avg_Humidity:res.data.forecast.forecastday[0].day.avghumidity,
            Pressure:res.data.current.pressure_mb,
            UV:res.data.forecast.forecastday[0].day.uv,
            CO:res.data.forecast.forecastday[0].day.air_quality.co,
            NO2:res.data.forecast.forecastday[0].day.air_quality.no2,
            O3:res.data.forecast.forecastday[0].day.air_quality.o3,
            pm2:res.data.forecast.forecastday[0].day.air_quality.pm2_5,
            pm10:res.data.forecast.forecastday[0].day.air_quality.pm10,
            so2:res.data.forecast.forecastday[0].day.air_quality.so2,
            GB_index:res.data.forecast.forecastday[0].day.air_quality["gb-defra-index"],
            US_index:res.data.forecast.forecastday[0].day.air_quality["us-epa-index"],
            chance_of_rain:res.data.forecast.forecastday[0].day.daily_chance_of_rain,
            chance_of_snow:res.data.forecast.forecastday[0].day.daily_chance_of_snow,
            precipitation:res.data.forecast.forecastday[0].day.totalprecip_mm,
            Avg_tempC:res.data.forecast.forecastday[0].day.avgtemp_c,
            Avg_tempF:res.data.forecast.forecastday[0].day.avgtemp_f,
            Forecast_Time_text1:
              res.data.forecast.forecastday[0].hour[9].condition.text,
            Forecast_Time_icon1:
              res.data.forecast.forecastday[0].hour[9].condition.icon,
            Forecast_Time_temp_c1:
              res.data.forecast.forecastday[0].hour[9].temp_c,
            Forecast_Time_text2:
              res.data.forecast.forecastday[0].hour[14].condition.text,
            Forecast_Time_icon2:
              res.data.forecast.forecastday[0].hour[14].condition.icon,
            Forecast_Time_temp_c2:
              res.data.forecast.forecastday[0].hour[14].temp_c,
            Forecast_Time_text3:
              res.data.forecast.forecastday[0].hour[19].condition.text,
            Forecast_Time_icon3:
              res.data.forecast.forecastday[0].hour[19].condition.icon,
            Forecast_Time_temp_c3:
              res.data.forecast.forecastday[0].hour[19].temp_c,
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
  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const data = window.localStorage.getItem("Curr_Theme");
    if (data !== "dark") setTheme(data);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Curr_Theme", theme);
  }, [theme]);

  const [showmore, setShowmore] = useState(false);

  const handleclick = (event) => {
    if (showmore === false) {
      setShowmore(true);
    } else {
      setShowmore(false);
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <h2>WeatherVista</h2>
            </div>
            <div className="search">
              <input
                type="search"
                placeholder="Enter the name of your Town, City or Region"
                onChange={(e) => setcurrName(e.target.value)}
              />
              <button onClick={handleSearch}>
                <i class="fi fi-rr-search"></i>
              </button>
            </div>
            <div className="ThemeSwitch">
              <input
                className="dark_mode_input"
                type="checkbox"
                id="darkmode-toggle"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <label  htmlFor="k" className="dark_mode_label" for="darkmode-toggle">
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
            <div className="MoreInfo">
              <div className="ForeCast">
                <p>Today's Forecast</p>
                <div className="Hourly-Info">
                  <div className="Hourly-Forecast">
                    <p>Morning</p>
                    <h4>{data.Forecast_Time_temp_c1}°c</h4>
                    <h5>{data.Forecast_Time_text1}</h5>
                    <img src={data.Forecast_Time_icon1} alt="" />
                  </div>
                  <hr></hr>
                  <div className="Hourly-Forecast">
                    <p>Afternoon</p>
                    <h4>{data.Forecast_Time_temp_c2}°c</h4>
                    <h5>{data.Forecast_Time_text2}</h5>
                    <img src={data.Forecast_Time_icon2} alt="" />
                  </div>
                  <hr />
                  <div className="Hourly-Forecast">
                    <p>Evening</p>
                    <h4>{data.Forecast_Time_temp_c3}°c</h4>
                    <h5>{data.Forecast_Time_text3}</h5>
                    <img src={data.Forecast_Time_icon3} alt="" />
                  </div>
                </div>
                <button className="foreCast-btn">Hourly Forecast</button>
              </div>
              <div className="Location">
                <div className="Stats">
                  <img src={Map} alt="" />

                  <div className="box1">
                    <sub>
                      Lat. <span>{data.latitude}°N</span>&nbsp; Long.{" "}
                      <span>{data.longitude}°E</span>
                    </sub>
                    <sup>
                      <span> {data.region} </span>
                    </sup>
                    <sub>
                      {" "}
                      <span>{data.country}</span>{" "}
                    </sub>
                  </div>
                  <div className="more-location-info">
                    <small>
                      Local time: <strong>{data.time}</strong>{" "}
                    </small>
                    <sub>
                      <span> {data.tz_id} </span>{" "}
                    </sub>
                  </div>
                </div>
              </div>
              <div className="showMoreInfo">
                <button onClick={handleclick}>
                  More info <i class="fi fi-rr-caret-down"></i>
                </button>
                {showmore && (
                  <div className="Showmore">
                    <h3> Today's Weather in {data.name}</h3>
                    <div className="Todays-summary">
                      <img src={Clouds} alt="" />
                      <div className="innerBox">
                        <small><i class="fi fi-rr-dewpoint"></i>&nbsp;&nbsp;Avg. Humidity:&nbsp;&nbsp;{data.Avg_Humidity}% </small>
                        <hr />
                        <small><i class="fi fi-rr-down-left-and-up-right-to-center"></i>&nbsp;&nbsp;Pressure:&nbsp;&nbsp;{data.Pressure}mb </small>
                        <hr/>
                        <small><i class="fi fi-rr-cloud-showers-heavy"></i>&nbsp;&nbsp;Chance of rain: {data.chance_of_rain}% </small>
                      <hr className="hr-bottom"></hr>
                      </div>
                      <div className="innerBox">
                        <small><i class="fi fi-ts-cloud-rain"></i>&nbsp;&nbsp;Total precipitation: {data.precipitation} mm</small>
                        <hr/>
                       <small><i class="fi fi-rr-temperature-list"></i>&nbsp;&nbsp;Avg.Temp&nbsp;&nbsp;{data.Avg_tempC}°C/&nbsp;{data.Avg_tempF}°F</small>
                        <hr />
                        <small><i class="fi fi-rr-eclipse-alt"></i>&nbsp;&nbsp;UV index:&nbsp;&nbsp; {data.UV} </small>
                        <hr/>
                        <small><i class="fi fi-rr-snowflakes"></i>&nbsp;&nbsp;Chance of snow: {data.chance_of_snow} %</small>

                      </div>
                    </div>
                    <div className="air-quality">
                      <h4>Air quality</h4>
                      <strong>US epa index: <span>{data.GB_index}</span> </strong>
                      &nbsp;&nbsp;
                      <strong>GB defra index <span>{data.US_index}</span> </strong>
                      <hr />
                      <small>CO: <span>{Math.round(data.CO)}ppm</span>&nbsp;&nbsp;&nbsp;NO2: <span>{Math.round(data.NO2)} ppb</span>&nbsp;&nbsp;&nbsp;Ozone: &nbsp; <span>{Math.round(data.O3)} ppb</span>  </small>
                      <hr />
                      <small>PM 2.5: <span>{Math.round(data.pm2)}µg/m³</span>&nbsp;&nbsp;&nbsp;PM 10: <span>{Math.round(data.pm10)}µg/m³</span>&nbsp;&nbsp;&nbsp;SO2: &nbsp; <span>{Math.round(data.so2)} ppb</span>  </small>
                    </div>
                    <div className="box">
                      <h4>Astro</h4>
                      <p>Blah blah</p>
                      <hr />
                      <p>Blah blah</p>
                      <hr />
                      <p>Blah blah</p>
                      <hr />
                      <p>Blah blah</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
