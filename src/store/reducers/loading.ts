// Imports
import * as actionTypes from "../actions/actionTypes";

const loadingReducer = (state: boolean = true, { type }: { type: string }) => {
  switch (type) {
    case actionTypes.START_FETCHING:
      return true;
    case actionTypes.STOP_FETCHING:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
