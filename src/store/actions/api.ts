/* eslint-disable no-console */
import axios, { AxiosResponse } from 'axios';
import IWeather from "../../types/IWeather";
import IRequestableEntity from "../../types/IRequestableEntity";

export const WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

export const getWeatherByCoordinates = (data: any) => {
  return axios.get(`https://cors-anywhere.herokuapp.com/${WEATHER_API_URL}`, {
    params: {
      APPID: '8932288cdb827d871a2f1495aae80b44',
      lat: data.position.lat,
      lon: data.position.lng,
      cnt: data.day,
      units: 'metric',
    },
  }).then((response: AxiosResponse<IRequestableEntity<IWeather>>) => {
    if (response.data.list.length > 0) {
      return response.data.list[data.day - 1];
    }

    if (response.status) {
      return response.status;
    }

    return response.data.list[response.data.list.length - 1];
  }).catch(error => {
    return console.error(error);
  });
};
