import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { Root, StartPage } from '../pages';

export default(
  <Route name="Root" path="/" component={Root}>
    <IndexRoute name="StartPage" component={StartPage} />
  </Route>
);
