import * as types from '../constants/ActionTypes';

export function updateElement(name, value) {
  return {
    type: types.UPDATE_ELEMENT,
    payload: { name, value },
  };
}
