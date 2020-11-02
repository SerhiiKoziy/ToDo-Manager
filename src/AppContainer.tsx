
import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

import App from "./containers/App/App";
import configureStore, { browserHistory } from "./store";

import "./index.scss";

const store = configureStore();

// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedRouter history={browserHistory}>
//       <App />
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById("root")
// );

const AppContainer = () => (
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default AppContainer;
