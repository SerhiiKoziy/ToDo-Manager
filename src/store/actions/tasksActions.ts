import * as types from './actionTypes';
import { getWeatherByCoordinates } from './api';
import { postEventFirebase, putEventFirebase, deleteEvent } from '../action-firebase/events';

export function setList(payload: any) {
  return {
    type: types.SET_LIST,
    payload,
  };
}

export function addTask(payload: any) {
  return {
    type: types.ADD_TASK,
    payload,
  };
}

export function createTaskAction(task: any) {
  return () => {
    return getWeatherByCoordinates(task).then(
      (weather: any) => {
        const taskWithWeather = { weather, ...task };

        postEventFirebase(taskWithWeather);
        // dispatch(addTask(taskWithWeather));

        return 'success';
      }
    );
  };
}

export function updateTask(payload: any) {
  return {
    type: types.UPDATE_TASK,
    payload,
  };
}

export function editTaskAction(task: any) {
  return (dispatch: any) => {
    getWeatherByCoordinates(task).then((weather: any) => {
      task.weather = weather;

      putEventFirebase(task, task.eventId).then((res: any) => {
        dispatch(updateTask([task]))
      });
    });
  };
}

export function deleteEventStore(eventId: any) {
  return {
    type: types.DELETE_TASK,
    payload: eventId,
  };
}

export function deleteTask(eventId: any) {
  return (dispatch: any) => {
    deleteEvent(eventId).then(() => {
      dispatch(deleteEventStore(eventId));
    });
  };
}
