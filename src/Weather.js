
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { MdGrain } from "react-icons/md";

export const Weather = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  useEffect(()=> {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=6fafefd824c934e7074f72d2b5cd523d&units=metric`)
    .then(res=> res.json())
    .then(text => {
      setData(text)
      console.log(text)
    }).catch(err=> console.log(err))
  }, [])

  function handleSearch(e){
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6fafefd824c934e7074f72d2b5cd523d&units=metric`)
    .then(res=> res.json())
    .then(text => {
      if (text.cod === "404") {
        setError(true); // Set error state to true if city is not found
        setData({}); // Clear data to avoid rendering old data
      } else {
        setData(text);
        setError(false); // Reset error state if data is successfully fetched
      }
      setCity(""); // Clear input field regardless of whether city was found or not
      console.log(text)
    }).catch(err=> setError(true)); // Set error state if there's an error in fetching data
  }

  return (
    <div className="weather">
      <div className="search-bar">
        <form action="">
          <input type="text" placeholder="Search...." value={city} onChange={(e) => setCity(e.target.value)} />
          <button className="search" onClick={handleSearch}>
            <FaSearch />
          </button>
        </form>
      </div>
      {error ? (
        <div className="error">City Not found. Please enter again.</div>
      ) : data.name ? (
        <div className="city">
          <div className="city-climate">
            <div className="city-name">{data.name}</div>
            <div className="sky">{data.weather[0].main}</div>
          </div>
          <div className="image">
            <img src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="" />
          </div>
          <div className="temp">
            <div className="avg">{Math.round(data.main.temp)} °C</div>
            <div className="max-min">
              <div className="min">
                <div className="min-text">min</div>
                <div className="min-num">{data.main.temp_min}</div>
              </div>
              <div className="max">
                <div className="max-text">max</div>
                <div className="max-num">{data.main.temp_max}</div>
              </div>
            </div>
          </div>
  
          <div className="humidity-wind">
            <div className="humidity">
              <div className="humidity-img">
                <MdGrain />
              </div>
              <div className="humidity-content">
                <div className="humidity-num">{data.main.humidity || 14} %</div>
                <div className="humidity-text">Humidity</div>
              </div>
            </div>
            <div className="wind">
              <div className="wind-img">
                <FaWind />
              </div>
              <div className="wind-content">
                <div className="wind-num">{data.wind.speed || 4.6} km/h</div>
                <div className="wind-text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
  
};
