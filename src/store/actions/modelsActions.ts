// Imports
import * as actionTypes from "./actionTypes";
// Type imports
import { Model } from "../sagas";

export const fetchCarsList = () => {
  return {
    type: actionTypes.FETCH_LIST_OF_CARS,
  };
};

export interface SetListOfModels {
  type: typeof actionTypes.SET_LIST_OF_MODELS;
  models: Model[];
}

export const setListOfModels = (models: Model[]) => {
  return {
    type: actionTypes.SET_LIST_OF_MODELS,
    models,
  };
};
