import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { createRootReducer } from './rootReducer';
import rootSaga from './rootSaga';

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

export default configureStore;
