import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default function configureStore(initialState) {
  const middleware = [thunk];
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware)),
  );
  return store;
}
