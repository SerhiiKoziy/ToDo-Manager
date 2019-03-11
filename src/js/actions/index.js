import * as types from '../constants/ActionTypes';
import { getWeatherByCoordinates } from './api';
import { postNewEvent, putEventInfo, deleteEvent } from '../action-firebase/events';

export function setList(payload) {
  return {
    type: types.SET_LIST,
    payload,
  };
}

export function addTask(payload) {
  return {
    type: types.ADD_TASK,
    payload,
  };
}

export function createTask(task) {
  return (dispatch) => {
    return getWeatherByCoordinates(task).then(
      (weather) => {
        const taskWithWeather = { weather, ...task };

        postNewEvent(taskWithWeather);
        dispatch(addTask(taskWithWeather));

        return 'success';
      }
    );
  };
}

export function updateTask(payload) {
  return {
    type: types.UPDATE_TASK,
    payload,
  };
}

export function editTask(task) {
  return (dispatch) => {
    getWeatherByCoordinates(task).then(weather => {
      task.weather = weather;

      putEventInfo(task);
      dispatch(updateTask(task));
    });
  };
}

export function deleteEventStore(taskId) {
  return {
    type: types.DELETE_TASK,
    payload: taskId,
  };
}

export function deleteTask(taskId) {
  return (dispatch) => {
    deleteEvent(taskId).then(() => {
      dispatch(deleteEventStore(taskId));
    });
  };
}
