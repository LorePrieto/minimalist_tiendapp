import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import user from './user';
import orders from './orders';
import store from './store';

const root = combineReducers({
  products,
  cart,
  user,
  orders,
  store
});

export default root;
