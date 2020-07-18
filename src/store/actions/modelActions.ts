// Imports
import * as actionTypes from "./actionTypes";
// Type imports
import { CurrentModelTrim, CurrentModelWithSelectedTrim } from "../sagas";

export interface FetchModel {
  type: typeof actionTypes.FETCH_MODEL;
  id: string;
}
export const fetchModel = (id: string): FetchModel => {
  return {
    type: actionTypes.FETCH_MODEL,
    id,
  };
};

export interface SelectTrim {
  type: typeof actionTypes.SELECT_TRIM;
  name: string;
}
export const selectTrim = (trimName: string): SelectTrim => {
  return {
    type: actionTypes.SELECT_TRIM,
    name: trimName,
  };
};

export interface SelectTrimColor {
  type: typeof actionTypes.SELECT_TRIM_COLOR;
  name: string;
}
export const selectTrimColor = (name: string): SelectTrimColor => {
  return {
    type: actionTypes.SELECT_TRIM_COLOR,
    name,
  };
};

export interface SetCurrentTrim {
  type: typeof actionTypes.SET_CURRENT_TRIM;
  currentTrim: CurrentModelTrim;
}
export const setCurrentTrim = (currentTrim: CurrentModelTrim) => {
  return {
    type: actionTypes.SET_CURRENT_TRIM,
    currentTrim,
  };
};

export interface SetCurrentModel {
  type: typeof actionTypes.SET_CURRENT_MODEL;
  currentModel: CurrentModelWithSelectedTrim;
}
export const setCurrentModel = (currentModel: CurrentModelWithSelectedTrim) => {
  return {
    type: actionTypes.SET_CURRENT_MODEL,
    currentModel,
  };
};

export const proceed = () => {
  return {
    type: actionTypes.PROCEED_REQUEST,
  };
};
