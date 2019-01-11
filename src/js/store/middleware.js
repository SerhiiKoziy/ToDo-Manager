/* eslint-disable no-console */
import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../constants/ActionTypes';
const updateActions = { ADD_TASK, UPDATE_TASK, DELETE_TASK };

function shouldLocalStorageUpdate(actionType) {
  return updateActions.hasOwnProperty(actionType);
}

const updateLocalStorage = store =>
 next => {
   return action => {
     const result = next(action);
     if (shouldLocalStorageUpdate(action.type)) {
       console.info('Updating localstorage');
       localStorage.setItem('LocalStorageTaskList', JSON.stringify(store.getState().data));
     }

     return result;
   };
 };


export default updateLocalStorage;
