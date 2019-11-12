import * as types from '../constants/ActionTypes';
import { getWeatherByCoordinates } from './api';
import { postEventFirebase, putEventFirebase, deleteEvent } from '../action-firebase/events';

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

export function createTaskAction(task) {
  return () => {
    return getWeatherByCoordinates(task).then(
      (weather) => {
        const taskWithWeather = { weather, ...task };

        postEventFirebase(taskWithWeather);
        // dispatch(addTask(taskWithWeather));

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

export function editTaskAction(task) {
  return (dispatch) => {
    getWeatherByCoordinates(task).then(weather => {
      task.weather = weather;

      putEventFirebase(task, task.id).then((res) => {
        console.log('putEventFirebase', res)
      });
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
