import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import { setList } from './actions';
import Root from './pages/Root';
import DashBoard from './pages/DashBoard';
import TaskPage from './pages/TaskPage';
import EditTask from './pages/EditTask';
import '../sass/common.scss';

const { store, history } = configureStore(hashHistory);

if (localStorage.getItem('LocalStorageTaskList')) {
  const string = localStorage.getItem('LocalStorageTaskList');
  const tasksList = JSON.parse(string);

  store.dispatch(setList(tasksList));
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route name="Root" path="/" component={Root}>

        <Route name="task" path="task/:taskId" component={TaskPage}>
          <Route name="EditTask" path="edit" component={EditTask} />
        </Route>
        <IndexRoute name="DashBoard" component={DashBoard} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
