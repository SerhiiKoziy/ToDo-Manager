import * as types from '../constants/ActionTypes';
import axios from 'axios';
import * as API from '../constants/Api';

export function setList(payload) {
  return {
    type: types.SET_DATA,
    payload
  };
}
export function updateTask(payload) {

  return {
    type: types.UPDATE_ELEMENT,
    payload
  };
}

export function addNewTask(newTaskParameters) {
  return dispatch => {
     dispatch(getWatherToCoor(newTaskParameters));

  }


  return {
    type: types.ADD_ELEMENT,
    payload: paramWithWeather,
  };
}

export function getWatherToCoor(data) {

    axios.get(API.MAIN_API_URL, {
      params:{
        APPID: '8932288cdb827d871a2f1495aae80b44',
        lat: data.position.lat,
        lon: data.position.lng,
        cnt: data.day,
      }
    }).then(function (response) {
        //console.log('getWatherToCoordinates', response );
        if(response.data.list.length > 0){ //if we have forecast
          let weather = response.data.list[data.day - 1];
          let taskParameters = {weather, ...data}
          return taskParameters
        }else{ //else save without forecast
          console.log("error, forecast not found")

        }

        if(response.error) throw new Error(response.error);


      })
      .catch(function (error) {
        dispatch(requestWeatherNotFaund());
        console.log(error);
      })
}
/*export function getWatherToCoor(data) {
  return (dispatch, getState) => {
    axios.get(API.MAIN_API_URL, {
      params:{
        APPID: '8932288cdb827d871a2f1495aae80b44',
        lat: data.position.lat,
        lon: data.position.lng,
        cnt: data.day,
      }
    })
      .then(function (response) {
        console.log('getWatherToCoordinates', response );

        if(response.data.list.length > 0){ //if we have forecast
          let weather = response.data.list[data.day - 1];
          let taskParameters = {weather, ...data}
          dispatch(updateTask(taskParameters))
        }else{ //else save without forecast
          console.log("error, forecast not found")
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
}*/

export function receiveUserWeather(payload) {
  return {
    type: types.WEATHER_FROM_COORDINATES,
    payload
  };
}
export function deleteTaskInData(taskId){

  return {
    type: types.DELETE_ELEMENT,
    payload: taskId,
  };
}

export function requestWeatherNotFaund() {
  return {
    type: types.REQUEST_API_RESULT
  };
}