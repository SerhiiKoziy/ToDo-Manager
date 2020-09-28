import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { reducer as formReducer } from "redux-form";

import loadingReducer from "./reducers/loading";

import { IEventsState, eventsReducer } from "./events/reducer";
import { IUserState, userReducer } from "./user/reducer";

export interface StoreState {
  isLoading: boolean;
  user: IUserState;
  events: IEventsState;
  form: any;
  router: RouterState;
}

export const createRootReducer = (history: History) => (
  combineReducers<StoreState>({
    isLoading: loadingReducer,
    user: userReducer,
    events: eventsReducer,
    form: formReducer,
    router: connectRouter(history),
  })
);

