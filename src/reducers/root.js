import { combineReducers } from 'redux';
import products from './products';
import cart from './cart';
import user from './user';

/* Here, we especify which state key is updated by which reducer. Since we follow the convention
of naming a reducer and a state key with the same, we can do it as shown below.
For example, the state key 'products' is given to the 'products' reducer. */
const root = combineReducers({
  products,
  cart,
  user
});

export default root;
