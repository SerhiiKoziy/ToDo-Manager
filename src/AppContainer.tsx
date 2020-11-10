import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import App from './containers/App/App';
import configureStore, { browserHistory } from './store';

import './index.scss';

const store = configureStore();

const AppContainer = () => (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default AppContainer;
