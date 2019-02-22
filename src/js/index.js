import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import configureStore from './store/configureStore';
import { setList } from './actions';
import Root from './pages/Root';
import StartPage from './pages/StartPage';
import TaskPage from './pages/TaskPage';
import EditTask from './pages/EditTask';
import NotificationPage from './pages/NotificationPage';
import WelcomePage from './pages/WelcomePage';
import '../sass/common.scss';

const { store, history } = configureStore(hashHistory);

if (localStorage.getItem('LocalStorageTaskList')) {
  const string = localStorage.getItem('LocalStorageTaskList');
  try {
    const tasksList = JSON.parse(string);
    store.dispatch(setList(tasksList));
  } catch (e) {
    console.error('JSON parsing error:', e);
  }
}

render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact name="Root" path="/" component={Root}>
        <Route name="task" path="task/:taskId" component={TaskPage}>
          <Route name="EditTask" path="edit" component={EditTask} />
        </Route>
        <Route name="Welcome" path="welcome" component={WelcomePage} />
        <Route name="Profile" path="profile" component={NotificationPage} />
        <IndexRoute name="StartPage" component={StartPage} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app')
);
