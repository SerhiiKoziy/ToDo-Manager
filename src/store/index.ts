
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware as createRouterMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
// import axios from "axios";

import { createRootReducer } from "./rootReducer";
import rootSaga from "./rootSaga";

export const browserHistory = createBrowserHistory();

function configureStore() {
  const saga = createSagaMiddleware();
  const rootReducer = createRootReducer(browserHistory);
  const routerMiddleware = createRouterMiddleware(browserHistory);
  const composedMiddleware = composeWithDevTools(
    applyMiddleware(saga, routerMiddleware)
  );
  const store = createStore(rootReducer, composedMiddleware);
  saga.run(rootSaga);

  return store;
}

// axios.defaults.baseURL = "https://reacttestprojectapi.azurewebsites.net/Cars";
// axios.defaults.headers["X-API-KEY"] = "320e638a-4e70-4408-9f37-0fcef96c8574";

export default configureStore;
