import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import StartPage from './pages/StartPage';
import configureStore from './store/configureStore';
import '../sass/common.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <StartPage />
  </Provider>
  , document.getElementById('app'));
