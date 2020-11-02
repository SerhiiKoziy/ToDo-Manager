import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './polyfills';

ReactDOM.render(<App />, document.getElementById('root'));

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    const ReloadedApp = require('./App').default;
    ReactDOM.render(<ReloadedApp />, document.getElementById('root'));
  });
}
