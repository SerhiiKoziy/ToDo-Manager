import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './AppContainer';

import './polyfills';

ReactDOM.render(<AppContainer />, document.getElementById('root'));

if ((module as any).hot) {
  (module as any).hot.accept('./AppContainer', () => {
    const ReloadedApp = require('./AppContainer').default;
    ReactDOM.render(<ReloadedApp />, document.getElementById('root'));
  });
}
