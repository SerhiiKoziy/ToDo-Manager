import * as types from '../constants/ActionTypes';
import { getWeatherByCoordinates } from './api';

export function setList(payload) {
  return {
    type: types.SET_LIST,
    payload,
  };
}

export function updateTask(payload) {
  return {
    type: types.UPDATE_TASK,
    payload,
  };
}

export function addTask(payload) {
  return {
    type: types.ADD_TASK,
    payload,
  };
}

export function deleteTask(taskId) {
  return {
    type: types.DELETE_TASK,
    payload: taskId,
  };
}

export function editTask(task) {
  return (dispatch) => {
    getWeatherByCoordinates(task).then(weather => {
      task.weather = weather;
      dispatch(updateTask(task));
    }
    );
  };
}

export function createTask(task) {
  return (dispatch) => {
    getWeatherByCoordinates(task).then(
      (weather) => {
        const taskWithWeather = { weather, ...task };
        dispatch(addTask(taskWithWeather));
      }
    );
  };
}
