/* eslint-disable no-console */
import axios from 'axios';

export const MAIN_API_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

export function getWeatherByCoordinates(data) {
  return axios.get(`https://cors-anywhere.herokuapp.com/${MAIN_API_URL}`, {
    params: {
      APPID: '8932288cdb827d871a2f1495aae80b44',
      lat: data.position.lat,
      lon: data.position.lng,
      cnt: data.day,
      units: 'metric',
    },
  }).then((response) => {
    if (response.data.list.length > 0) {
      return response.data.list[data.day - 1];
    }
    return response.data.list[response.data.list.length - 1];

    if (response.error) {
      throw new Error(response.error);
    }

    return null;
  }).catch(error => {
    return console.error(error);
  });
}
