import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import user from './user';

const root = combineReducers({
  products,
  cart,
  user
});

export default root;
