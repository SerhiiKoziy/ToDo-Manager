import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { reducer as formReducer } from "redux-form";

// import loadingReducer from "./loading";
// import dataReducer from "./dataReducer";
// import userReducer from "./userReducer";

export const createRootReducer = (history: History) => (
  combineReducers<any>({
      // isLoading: loadingReducer,
      // data: dataReducer,
      // user: userReducer,
      form: formReducer,
      router: connectRouter(history),
  })
);

