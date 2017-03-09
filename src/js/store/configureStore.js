import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { DataReducer } from '../reducers';
import createLogger from 'redux-logger';
import { INITIAL_STATE } from '../constants/InitialState';
import { routerReducer, routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

const reducer = combineReducers({
  routing: routerReducer,
  data: DataReducer,
});
export default function configureStore(baseHistory, initialState = INITIAL_STATE ) {
  const routingMiddleware = routerMiddleware(baseHistory);
  const logger = createLogger();
  const middleware = applyMiddleware(routingMiddleware, thunk, logger);

  const store = createStore(reducer, initialState, compose(
    middleware
  ));
  const history = syncHistoryWithStore(baseHistory, store);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
        return store.replaceReducer(require('../reducers') /* .default if you use Babel 6+  */);
      }
    );
  }

  return { store, history };
}
