import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Root, StartPage, TaskPage, EditTask, AddTask, NotificationPage } from "../../pages";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.App}>
      <Suspense fallback={<div></div>}>
        <Switch>

          <Route path="/events" component={() => <StartPage />} />
          <Route path="/profile" component={() => <NotificationPage /> } />
          {/*<Route path="/task/:taskId" component={() => <TaskPage /> } />*/}
          <Route path="/task/:taskId/edit" component={() => <EditTask /> } />
          <Route path="/add" component={() => <AddTask /> } />
          <Route path="/" component={() => <Root />} />

          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
