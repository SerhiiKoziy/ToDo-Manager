// Imports
import * as actionTypes from "../actions/actionTypes";
import { actionFactory } from '../utils'

import { FETCH_USER } from './sagas';
// Type imports

export interface FetchUser {
  type: typeof FETCH_USER;
  // id: string;
}

// export const fetchUserAction = (): FetchUser => {
//   console.log('0000')
//   return {
//     type: FETCH_USER,
//   };
// };


export const fetchUserAction = () => actionFactory(FETCH_USER);

// export const proceed = () => {
//   return {
//     type: actionTypes.PROCEED_REQUEST,
//   };
// };
