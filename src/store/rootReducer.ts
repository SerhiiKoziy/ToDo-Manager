import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { reducer as formReducer } from "redux-form";

import loadingReducer from "./loading/reducer";
import { IEventsState, eventsReducer, RESET_CURRENT_EVENT } from "./events/reducer";
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
    form: formReducer.plugin({
      EVENT_FORM: (state, action) => {
        switch(action.type) {
          case RESET_CURRENT_EVENT:
            return null;       // <--- blow away form data
          default:
            return state;
        }
      }
    }),
    router: connectRouter(history),
  })
);

