import * as actionTypes from "./reducer";

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
