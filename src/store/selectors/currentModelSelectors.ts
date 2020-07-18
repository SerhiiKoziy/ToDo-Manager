// Type imports
import { StoreState } from "../reducers";

export const getCurrentModel = (state: StoreState) => state.currentModel;
export const getCurrentModelTrims = (state: StoreState) => getCurrentModel(state).trims;
export const getCurrentTrim = (state: StoreState) => getCurrentModel(state).currentTrim;
export const getCurrentTrimColorName = (state: StoreState) => getCurrentTrim(state).colorName;

export const getData = (state: StoreState) => state.data;
// export const getTasksList = (state: StoreState) => getData(state).list;
