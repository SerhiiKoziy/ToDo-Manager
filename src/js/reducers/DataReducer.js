import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case types.UPDATE_ELEMENT:
      const data = state.elements.map(item => {
        if (item.name === payload.name) {
          item.value = payload.value;
        }
        return item;
      });

      return {
        ...state,
        elements:data,
      };

    default:
      return state;
  }
}
