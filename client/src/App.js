import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import { Provider } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { routerReducer, routerMiddleware } from "react-router-redux";
import logger from "redux-logger";

import reducers from "./reducers";
import {
  AllUsers,
  Dashboard,
  Game,
  Lobby,
  Login,
  Register,
  User
} from "./containers";
import { TOKEN_NAME } from "./config";
import { toggleToken } from "./utils";

const history = createBrowserHistory();
const reactRouterMiddleware = routerMiddleware(history);

const bootstrappedStore = { USER: { isLoggedIn: false } };
const token = localStorage.getItem(TOKEN_NAME);
const user = JSON.parse(localStorage.getItem(`${TOKEN_NAME}-data`));
console.log(user);
if (token && token !== "") {
  toggleToken(token);
  bootstrappedStore.USER = { isLoggedIn: true, ...user };
}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  bootstrappedStore,
  applyMiddleware(promiseMiddleware, reactRouterMiddleware, logger)
);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/users" component={AllUsers} />
        <Route exact path="/user/:id" component={User} />
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  </Provider>
);

export default App;
