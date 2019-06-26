import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import { Provider } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router";
import { createBrowserHistory } from "history";
import { routerReducer } from "react-router-redux";

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

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(promiseMiddleware)
);

const history = createBrowserHistory();

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
