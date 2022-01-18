import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { todosReducer } from './todolist/reducer';
import { toastReducer } from './toast/reducer';

const rootReducer = combineReducers({ toast: toastReducer, todos: todosReducer });
const store = createStore(rootReducer, applyMiddleware(thunk, logger));
export default store;