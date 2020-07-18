// Imports
import * as actionTypes from "./actionTypes";

export const startFetching = () => {
  return {
    type: actionTypes.START_FETCHING,
  };
};

export const stopFetching = () => {
  return {
    type: actionTypes.STOP_FETCHING,
  };
};
