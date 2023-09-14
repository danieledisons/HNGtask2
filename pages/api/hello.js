import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({ baseURL: BASE_URL });

const APIKEY = "a88164522365d78d10f28d20e5bcd4d5";

const getUpcoming = api.get("movies/upcoming", {
  params: { APIKEY },
});

getUpcoming.then((response) => {
  setData;
});
