import * as types from '../actions/actionTypes';

export function addUserStore(payload) {
  return {
    type: types.ADD_USER,
    payload,
  };
}

export function saveUserClaimsAction(payload) {
  return {
    type: types.ADD_USER_CLAIMS,
    payload,
  };
}

export function deleteUserStore(payload) {
  return {
    type: types.DELETE_USER,
    payload,
  };
}
