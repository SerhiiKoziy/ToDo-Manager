import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import {} from 'react-router';
import  Root  from './pages/Root';
import  DashBoard  from './pages/DashBoard';
import  TaskPage from './pages/TaskPage';
import  EditTask from './pages/EditTask';
import '../sass/common.scss';

const store = configureStore();



render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route name="Root" path="/" component={Root}>

        <Route name="task" path='task/:taskId' component={TaskPage}>
          <Route name="EditTask" path='edit' component={EditTask}  />
        </Route>
        <IndexRoute name="DashBoard" component={DashBoard} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
