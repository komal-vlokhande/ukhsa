import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { authReducer } from './auth/authReducer';
import { AppActions } from './models/actions';

const logger = createLogger();

export const rootReducer = combineReducers({ authReducer });

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk))

