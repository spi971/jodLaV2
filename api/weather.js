import axios from "axios";
import { API_KEY } from "../constants";

const forecast = (params) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;

const searchLocation = (params) =>
  `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.cityName}`;

const apiCall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const fetchWeather = (params) => {
  let forecastUrl = forecast(params);
  return apiCall(forecastUrl);
};

export const fetchLocation = (params) => {
  let locationsUrl = searchLocation(params);
  return apiCall(locationsUrl);
};
