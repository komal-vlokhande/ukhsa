import {legacy_createStore as createStore, applyMiddleware,compose} from 'redux'

import thunk from 'redux-thunk';
import rootReducer from './app/reducers/rootReducer';
const composedEnhancer = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export default function configureStore(initialState={}) {
 
  const middlewareEnhancer = applyMiddleware(thunk)

  const store = createStore(rootReducer, initialState, composedEnhancer(middlewareEnhancer));
 return store;
}
