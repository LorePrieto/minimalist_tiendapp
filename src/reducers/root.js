import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import user from './user';
import orders from './orders';

const root = combineReducers({
  products,
  cart,
  user,
  orders
});

export default root;
