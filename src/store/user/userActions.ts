// Imports
import * as actionTypes from "../actions/actionTypes";
// Type imports

export interface FetchUser {
  type: typeof actionTypes.FETCH_USER;
  // id: string;
}

export const fetchUserAction = (): FetchUser => {
  console.log('0000')
  return {
    type: actionTypes.FETCH_USER,
  };
};

export const proceed = () => {
  return {
    type: actionTypes.PROCEED_REQUEST,
  };
};
