import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export function UserReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  // const user = state;
  switch (type) {
    case types.ADD_USER:
      return payload;

    case types.DELETE_USER:
      return {};

    default:
      return state;
  }
}
