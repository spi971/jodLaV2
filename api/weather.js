import axios from "axios";
import { API_KEY } from "../constants";

const forecast = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const searchLocation = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`;

const apicall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};

export const fetchWeather = (params) => {
  return apicall(forecast(params));
};

export const fetchLocation = (params) => {
    return apicall(searchLocation(params));
  };
