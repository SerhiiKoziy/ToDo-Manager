import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { TaskPage, EditTask, AddTask, NotificationPage } from "../../pages";
import Root from "../../pages/Root";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>

          <Route path="/profile" component={() => <NotificationPage /> } />
          {/*<Route path="/event/:taskId" component={() => <TaskPage /> } />*/}
          <Route path="/event/:eventId/edit" component={() => <EditTask /> } />
          <Route path="/add" component={() => <AddTask /> } />

          <Route path="/" component={() => <Root /> } />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
