// Imports
import * as actionTypes from "../actions/actionTypes";
// Type imports
import { CurrentModelTrim, CurrentModelWithSelectedTrim } from "../sagas";

export interface FetchUser {
  type: typeof actionTypes.FETCH_USER;
  id: string;
}
export const fetchUser = (id: string): FetchUser => {
  return {
    type: actionTypes.FETCH_USER,
    id,
  };
};

export const proceed = () => {
  return {
    type: actionTypes.PROCEED_REQUEST,
  };
};
