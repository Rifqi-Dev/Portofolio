import axios from "axios";

const BaseURL = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
export const imageURL = "https://data.bmkg.go.id/DataMKG/TEWS/";

export const EarthquackeService = {
  getData: async () => {
    return await axios
      .get(BaseURL)
      .then((r) => {
        return r.data;
      })
      .catch((e) => {
        throw Error(e);
      });
  },
};
