import * as types from '../constants/ActionTypes';

export function addUserStore(payload) {
  console.log('payload', payload)
  return {
    type: types.ADD_USER,
    payload,
  };
}
