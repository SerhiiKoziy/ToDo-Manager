import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { reducer as formReducer } from "redux-form";

import modelsReducer from "./models";
import currentModel from "./currentModel";
import loadingReducer from "./loading";
import dataReducer from "./dataReducer";
import userReducer from "./userReducer";

import { Model, CurrentModelWithSelectedTrim } from "../sagas";

export interface StoreState {
  models: Model[];
  user: object;
  data: any[];
  currentModel: CurrentModelWithSelectedTrim;
  isLoading: boolean;
  router: RouterState;
}

export const createRootReducer = (history: History) => (
  combineReducers<StoreState>({
      models: modelsReducer,
      currentModel: currentModel,
      isLoading: loadingReducer,
      data: dataReducer,
      user: userReducer,
      form: formReducer,
      router: connectRouter(history),
  })
);

