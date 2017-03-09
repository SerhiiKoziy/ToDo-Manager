import * as types from '../constants/ActionTypes';
import axios from 'axios';
import * as API from '../constants/Api';

export function setList(payload) {
  return {
    type: types.SET_LIST,
    payload
  };
}


export function editTask(editTaskParameters) {
  return (dispatch)=>{
    getWatherToCoor(editTaskParameters).then(
      (weather) => {
        let taskParameters = {weather, ...editTaskParameters};
        //return taskParameters;
        console.log(taskParameters);
        dispatch(updateTask(taskParameters))

      }
  );
  }
}
export function updateTask(payload) {
  return {
    type: types.UPDATE_TASK,
    payload
  };
}

export function createTask(newTaskParameters) {
    return (dispatch)=>{
      getWatherToCoor(newTaskParameters).then(
      (weather) => {
        let taskParameters = {weather, ...newTaskParameters};
        //return taskParameters;
        console.log(taskParameters);
        dispatch(addTask(taskParameters))

      }
    );
  }
}
export function addTask(payload) {
  return {
    type: types.ADD_TASK,
    payload: payload,
  }
}
export function getWatherToCoor(data) {

  return axios.get(API.MAIN_API_URL, {
      params:{
        APPID: '8932288cdb827d871a2f1495aae80b44',
        lat: data.position.lat,
        lon: data.position.lng,
        cnt: data.day,
      }
    }).then(function (response) {
      let weatherObj;
        if(response.data.list.length > 0){
          weatherObj = response.data.list[data.day - 1];
          console.log('getWatherToCoor', weatherObj );
          return weatherObj;
        }else{
          console.log("error, forecast not found")
          return  {
            clouds: 0
          }
        }
        if(response.error) throw new Error(response.error);
      })
      .catch(function (error) {
        dispatch(requestWeatherNotFaund());
        console.log(error);
      })
}

export function deleteTaskInList(taskId){
  return {
    type: types.DELETE_TASK,
    payload: taskId,
  };
}

export function requestWeatherNotFaund() {
  return {
    type: types.REQUEST_API_RESULT
  };
}