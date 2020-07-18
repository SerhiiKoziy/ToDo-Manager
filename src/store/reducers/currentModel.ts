// Imports
import * as actionTypes from "../actions/actionTypes";
// Type Imports
import { CurrentModelWithSelectedTrim } from "../sagas";
import { SetCurrentModel, SetCurrentTrim } from "../actions";

const initialState = {
  code: "",
  name: "",
  currentTrim: {
    name: "",
    color: {},
    price: 0,
    totalLocalPrice: "",
    colorName: "",
    colors: [],
  },
  trims: [],
};

const currentModelReducer = (
  state: CurrentModelWithSelectedTrim = initialState,
  action: SetCurrentModel | SetCurrentTrim
) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_MODEL:
      return {
        ...state,
        ...action.currentModel,
      };
    case actionTypes.SET_CURRENT_TRIM:
      return {
        ...state,
        currentTrim: action.currentTrim,
      };
    default:
      return state;
  }
};

export default currentModelReducer;
