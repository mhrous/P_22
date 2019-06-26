import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import { Provider } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router";
import { createBrowserHistory } from "history";

import { routerReducer } from "react-router-redux";

const store = createStore(
  combineReducers({
    routing: routerReducer
  }),
  applyMiddleware(promiseMiddleware)
);

const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={() => <div>log in page</div>} />
        <Route exact path="/register" component={() => <div>room page</div>} />
        <Route exact path="/lobby" component={() => <div>lobby page</div>} />
        <Route
          exact
          path="/dashboard"
          component={() => <div>dashboard page</div>}
        />
        <Route exact path="/game" component={() => <div>game page</div>} />
        <Route exact path="/users" component={() => <div>all user page</div>} />
        <Route exact path="/user/:id" component={() => <div>user page</div>} />
        <Redirect to="/dashboard" />
      </Switch>
    </Router>
  </Provider>
);

export default App;
