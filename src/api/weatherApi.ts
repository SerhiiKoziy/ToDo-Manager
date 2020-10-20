/* eslint-disable no-console */
import axios from 'axios';
import IPosition from "../types/IPosition";

export const MAIN_API_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

export async function getWeatherByCoordinates(position: IPosition, day: number) {
  return axios.get(`https://cors-anywhere.herokuapp.com/${MAIN_API_URL}`, {
    params: {
      APPID: '8932288cdb827d871a2f1495aae80b44',
      lat: position.lat,
      lon: position.lng,
      cnt: day,
      units: 'metric',
    },
  }).then((response) => {
    if (response.data.list.length > 0) {
      return response.data.list[day - 1];
    }

    return response.data.list[response.data.list.length - 1];

  }).catch(error => {
    return console.error(error);
  });
}
