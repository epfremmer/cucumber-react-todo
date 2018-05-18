import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import createHashHistory from "history/createHashHistory";
import * as reducers from '@app/reducers';

export const history = createHashHistory();

const middleware = routerMiddleware(history);
export const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer }),
  applyMiddleware(middleware)
);
