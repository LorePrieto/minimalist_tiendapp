import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session'
import rootReducer from './reducers/root';

const middlewares = [thunk];

const middlewareEnhancer = applyMiddleware(...middlewares);

const storeEnhancers = [middlewareEnhancer];

const composedEnhancer = composeWithDevTools(...storeEnhancers);

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['user', 'orders', 'cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, composedEnhancer)
  let persistor = persistStore(store)
  return { store, persistor }
}
