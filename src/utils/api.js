import axios from "axios";
import conf from "../conf/conf.js";

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: "bearer " + conf.tmdbToken,
};

export const fetchDataFromApi = async (url, params) => {
  // console.log("url: ", url)
  // console.log("params: ", params)
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    // console.log("fetch Data: ", data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
