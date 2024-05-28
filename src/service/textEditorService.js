import axios from "axios";

const API_URL = "https://api.kapuyuaxdev.my.id/";
export const executeCode = async (code) => {
  console.log(API_URL);
  return axios.post(API_URL + "run-code", { code: code });
};
