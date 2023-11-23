import axios from "axios";

const BaseURL = "https://api.openweathermap.org/data/2.5/";
const apiKey = "c9074c90a760e0f8240d5b943606b27e";
export const WeatherService = {
  getWeather: async (city) => {
    return await axios
      .get(`${BaseURL}weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        console.log(e);
        // throw e;
      });
  },
};
