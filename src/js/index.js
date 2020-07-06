import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHashHistory from 'history/lib/createHashHistory';

import { Router, Route } from 'react-router';
import configureStore from './store/configureStore';
import { setList } from './actions';
import Index from './pages/Index';
import StartPage from './pages/StartPage';
import TaskPage from './pages/TaskPage';
import EditTask from './pages/EditTask';
import AddTask from './pages/AddTask';
import NotificationPage from './pages/NotificationPage';
// import WelcomePage from './pages/WelcomePage';
import '../sass/common.scss';

const historyHash = createHashHistory({ alwaysEnableState: true });
const { store, history } = configureStore(historyHash);

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
      <Route exact name="Index" path="/root" component={Index}>
        <Route path="/" component={StartPage} />
        <Route path="/events" component={StartPage} />
        <Route path="/profile" component={NotificationPage} />
        <Route path="/task/:taskId" component={TaskPage} />
        {/* <Route path="/edit" component={EditTask} />*/}
        <Route path="/task/:taskId/edit" component={EditTask} />
        <Route path="/add" component={AddTask} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
