import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { DataReducer } from '../reducers';
import createLogger from 'redux-logger';
import { INITIAL_STATE } from '../constants/InitialState';


export default function configureStore(initialState = INITIAL_STATE) {

  const logger = createLogger();
  const middleware = applyMiddleware(thunk, logger);

  const store = createStore(DataReducer, initialState, compose(
    middleware
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      return store.replaceReducer( require('../reducers') /* .default if you use Babel 6+  */);
      }
    );
  }

  return store;
}
