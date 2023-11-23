import axios from "axios";

const BaseURL = "https://ipapi.co/json/";

export const GeolocationService = {
  getLocation: async () => {
    return await axios
      .get(BaseURL)
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        console.log(e);
        // throw e;
      });
  },
};
