// Imports
import * as actionTypes from "../actions/actionTypes";
// Type Imports
import { Model } from "../sagas";
import { SetListOfModels } from "../actions";

const modelsReducer = (state: Model[] = [], action: SetListOfModels) => {
  switch (action.type) {
    case actionTypes.SET_LIST_OF_MODELS:
      return [...action.models];
    default:
      return state;
  }
};

export default modelsReducer;
