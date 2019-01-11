import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  const data = state;
  switch (type) {
    case types.ADD_TASK:
      return [...data, payload];

    case types.DELETE_TASK:
      return data.filter(item => {
        return item.id !== payload;
      });

    case types.UPDATE_TASK:
      const filteredElements = data.filter(element => {
        return element.id !== payload.id;
      });

      return [...filteredElements, payload];

    case types.SET_LIST:
      return payload;

    default:
      return state;
  }
}
