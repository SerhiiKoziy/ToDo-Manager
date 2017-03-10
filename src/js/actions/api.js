/* eslint-disable no-console */
import * as API from '../constants/Api';
import axios from 'axios';

export function getWeatherByCoordinates(data) {
  return axios.get(API.MAIN_API_URL, {
    params: {
      APPID: '8932288cdb827d871a2f1495aae80b44',
      lat: data.position.lat,
      lon: data.position.lng,
      cnt: data.day,
    },
  }).then((response) => {
    if (response.data.list.length > 0) {
      return response.data.list[data.day - 1];
    }
    response.data.list[response.data.list.length - 1]
    if (response.error) {
      throw new Error(response.error);
    }

    return null;
  }).catch(error => {
    console.error(error);
  });
}
