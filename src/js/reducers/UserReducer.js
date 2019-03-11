import * as types from '../constants/ActionTypes';
import { INITIAL_STATE } from '../constants/InitialState';

export function UserReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_USER:
      return payload;

    case types.ADD_USER_CLAIMS:
      return payload;

    case types.DELETE_USER:
      return {};

    default:
      return state;
  }
}
