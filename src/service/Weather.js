import axios from "axios";

const BaseURL = "https://api.openweathermap.org/data/2.5/";
const apiKey = "c9074c90a760e0f8240d5b943606b27e";
export const WeatherService = {
  getWeather: async (lat, long) => {
    return await axios
      .get(
        `${BaseURL}weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric&lang=id`
      )
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        console.log(e);
        // throw e;
      });
  },
};
