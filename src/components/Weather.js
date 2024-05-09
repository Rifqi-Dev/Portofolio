import React, { useEffect, useState } from "react";
import { GeolocationService } from "../service/Geolocator";
import { WeatherService } from "../service/Weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faMapPin,
  faTachometerAlt,
  faTemperatureHalf,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const getIcon = (code) => {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
};

function Weather() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchUsingGeolocation(latitude, longitude);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log("You need to enabled location");
    }
  }, []);

  async function fetchUsingGeolocation(lat, long) {
    setLoading(true);
    await WeatherService.getWeather(lat, long).then((r) => {
      setWeather(r);
      //   console.log(r);
    });
    setLoading(false);
  }

  if (!loading)
    return (
      <div
        className=" rounded bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
 text-white w-fit h-fit p-4"
      >
        <div>
          <div className="text-center text-xl">
            <FontAwesomeIcon icon={faMapPin} className="mr-2" />
            {weather?.name}
          </div>
          <div className="flex">
            <div className="flex items-center flex-wrap justify-center md:justify-start">
              <div className="flex flex-col items-center  w-full md:w-fit mb-2 md:mb-0">
                <img src={getIcon(weather?.weather[0]?.icon)}></img>
                <h3 className="text-center mt-[-20px] text-lg">
                  {weather?.weather[0]?.main}
                </h3>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className=" text-xl">
                  <FontAwesomeIcon icon={faTemperatureHalf} className="mr-2" />
                  {weather?.main?.temp} &deg;C
                </h3>
                <h3 className=" text-xl">
                  <FontAwesomeIcon icon={faDroplet} className="mr-2" />
                  {weather?.main?.humidity} %
                </h3>
              </div>
              <div className="ml-8 flex flex-col gap-2">
                <h3 className=" text-xl">
                  <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
                  {weather?.main?.pressure} mpa
                </h3>

                <h3 className=" text-xl">
                  <FontAwesomeIcon icon={faWind} className="mr-2" />
                  {weather?.wind?.speed} km/h
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white  p-4">
        <div>
          <div className="text-center text-xl animate-pulse">
            <div className="bg-slate-700 h-[28px] w-full rounded-lg"></div>
          </div>
          <div className="flex animate-pulse mt-1">
            <div className="flex items-center flex-wrap justify-center md:justify-start">
              <div className="flex justify-center md:justify-start w-full md:w-fit">
                <div className="bg-slate-700 h-[100px] w-[100px] rounded-lg"></div>
              </div>

              <div className="flex flex-col gap-2 ml-2 md:mt-0 mt-1">
                <div className="bg-slate-700 h-[28px] w-[233px] rounded-lg"></div>
                <div className="bg-slate-700 h-[28px] w-[233px] rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        <p className=" text-[6px]">Please Allow Location</p>
      </div>
    );
}

export default Weather;
