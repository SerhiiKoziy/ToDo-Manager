import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  const data = state;
  switch (type) {

    case types.ADD_TASK:
      let newElements = [payload, ...data];
      localStorage.setItem('LocalStorageTaskList', JSON.stringify(newElements));
      return newElements;


    case types.DELETE_TASK:
      let newDataAfterDel = data.map((item) => {
        if (item.id !== payload) {
          return item;
        }
      }).filter(item => !!item);
      localStorage.setItem('LocalStorageTaskList', JSON.stringify(newDataAfterDel));
      return newDataAfterDel;

    case types.UPDATE_TASK:
      const filteredElements = data.filter(element => {
        return element.id !== payload.id;
      });

      localStorage.setItem('LocalStorageTaskList', JSON.stringify([...filteredElements, payload]));
      return [...filteredElements, payload];

    case types.SET_LIST:
      return payload;


    default:
      return state;
  }
}
