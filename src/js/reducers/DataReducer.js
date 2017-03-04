import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export default function DataReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {

    case types.ADD_ELEMENT:
      const data = state.elements;

      return {
        ...state,
        elements:[payload, ...data],
      };

    default:
      return state;
  }
}
