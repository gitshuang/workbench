import { createStore, applyMiddleware } from 'redux';
import thunk from 'pub-comp/thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import rootReducer from './root';

let middleware;

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk, promise);
} else {
  // middleware = applyMiddleware(thunk, promise, );
  middleware = applyMiddleware(createLogger(), thunk, promise);
}

// const preloadedState = {};

const store = createStore(
  rootReducer,
  middleware,
);

export default store;
