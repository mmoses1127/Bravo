import { legacy_createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import usersReducer from './users';
import contactsReducer from './contacts';
import tiersReducer from './tiers';
import interactionsReducer from './interactions';

const rootReducer = combineReducers ({
  session: sessionReducer,
  users: usersReducer,
  contacts: contactsReducer,
  tiers: tiersReducer,
  interactions: interactionsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState={}) => {
  return legacy_createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;