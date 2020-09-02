import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { reducer as formReducer } from "redux-form";

import loadingReducer from "./reducers/loading";
import dataReducer from "./reducers/dataReducer";

import { IEventsState } from "./events/reducer";
import eventsReducer from "./events/reducer";

import { IUserState, userReducer } from "./user/reducer";

export interface StoreState {
  isLoading: boolean;
  data: any[];
  user: IUserState;
  events: IEventsState;
  form: any;
  router: RouterState;
}

export const createRootReducer = (history: History) => (
  combineReducers<StoreState>({
    isLoading: loadingReducer,
    data: dataReducer,
    user: userReducer,
    events: eventsReducer,
    form: formReducer,
    router: connectRouter(history),
  })
);

