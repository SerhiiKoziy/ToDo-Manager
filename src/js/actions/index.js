import * as types from '../constants/ActionTypes';
import axios from 'axios';
import * as API from '../constants/Api';

export function addNewTask(newTask) {
  return {
    type: types.ADD_ELEMENT,
    payload: newTask,
  };
}

export function getWatherToCoor(data) {
  return (dispatch, getState) => {
    axios.get(API.MAIN_API_URL, {
      params:{
        APPID: '8932288cdb827d871a2f1495aae80b44',
        lat: data.position.lat,
        lon: data.position.lng,
        cnt: 10,
      }
    })
      .then(function (response) {
        console.log('getWatherToCoordinates', response );

        if(response.data.list.length > 0){
          let weather = response.data.list[data.day - 1];
          let taskParameters = {weather, ...data}
          dispatch(addNewTask(taskParameters))
        }else{
          dispatch(addNewTask(data))
        }

        //dispatch(receiveUserWeather(response));


        if(response.error) throw new Error(response.error);

      })
      .catch(function (error) {
        dispatch(requestWeatherNotFaund());
        console.log(error);
      });

  }
}

export function receiveUserWeather(payload) {
  return {
    type: types.WEATHER_FROM_COORDINATES,
    payload
  };
}