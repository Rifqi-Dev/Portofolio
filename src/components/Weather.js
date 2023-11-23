import React, { useEffect, useState } from "react";
import { GeolocationService } from "../service/Geolocator";
import { WeatherService } from "../service/Weather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faMapPin,
  faTemperatureHalf,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const getIcon = (code) => {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
};

function Weather() {
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState();
  useEffect(() => {
    const FetchLocation = async () => {
      await GeolocationService.getLocation().then(async (r) => {
        setLocation(r);

        await WeatherService.getWeather(r?.city).then((r) => {
          setWeather(r);
          console.log(r);
        });
        setLoading(false);
      });
    };
    setLoading(true);
    FetchLocation();
  }, []);
  if (!loading)
    return (
      <div className=" rounded bg-slate-900 text-white w-fit h-fit p-4">
        <div>
          <div className="text-center text-xl">
            <FontAwesomeIcon icon={faMapPin} className="mr-2" />
            {location?.city}
          </div>
          <div className="flex">
            <div className="flex items-center flex-wrap justify-center md:justify-start">
              <div className="flex justify-center md:justify-start w-full md:w-fit">
                <img src={getIcon(weather?.weather[0]?.icon)}></img>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className=" text-xl">{weather?.weather[0]?.main}</h3>
                <h3 className=" text-xl">
                  <FontAwesomeIcon icon={faTemperatureHalf} className="mr-2" />
                  {weather?.main?.temp} &deg;C
                </h3>
              </div>
              <div className="ml-8 flex flex-col gap-2">
                <h3 className=" text-xl">
                  <FontAwesomeIcon icon={faDroplet} className="mr-2" />
                  {weather?.main?.humidity} %
                </h3>
                <h3 className=" text-xl">
                  <FontAwesomeIcon icon={faWind} className="mr-2" />
                  {weather?.wind?.speed} km/h
                </h3>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-[7px]">This widget use Ip Geolocation</p>
      </div>
    );
  else
    return (
      <div className=" rounded bg-slate-900 text-white  p-4">
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
      </div>
    );
}

export default Weather;
