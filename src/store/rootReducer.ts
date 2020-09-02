import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { reducer as formReducer } from "redux-form";

import loadingReducer from "./reducers/loading";
import dataReducer from "./reducers/dataReducer";
import { userReducer } from "./user/reducer";

export interface StoreState {
  user: object;
  data: any[];
  isLoading: boolean;
  form: any;
  router: RouterState;
}

export const createRootReducer = (history: History) => (
  combineReducers<StoreState>({
    isLoading: loadingReducer,
    data: dataReducer,
    user: userReducer,
    form: formReducer,
    router: connectRouter(history),
  })
);

