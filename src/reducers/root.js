import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import user from './user';
import orders from './orders';
import tiendapp from './tiendapp';

const root = combineReducers({
  products,
  cart,
  user,
  orders,
  tiendapp
});

export default root;
