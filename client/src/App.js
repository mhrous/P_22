import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import { Provider } from "react-redux";
import { Route, Redirect, Switch } from "react-router";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const reactRouterMiddleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    router: routerReducer
  }),
  applyMiddleware(promiseMiddleware, reactRouterMiddleware)
);

function App() {
  return <Provider store={store}>hallw worald</Provider>;
}

export default App;
