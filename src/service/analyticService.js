import axios from "axios";
// import { configDotenv } from "dotenv";
// configDotenv();

const API_URL = "https://api.kapuyuaxdev.my.id/";

export const fetchAnalytic = async () => {
  // console.log(API_URL);
  return axios.get(API_URL + "analytics");
};
