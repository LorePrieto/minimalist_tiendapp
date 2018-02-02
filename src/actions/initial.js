import { updateUserCurrentCart } from './user';
import { loadOrders } from './orders';

/*
  Action to match local cart with TiendApp's cart.
  First it will update the user order_number.
  The need for this action exist after persisting
  the cart and user with redux-persist.
*/
export const updateAllCart = (token) => {
  return function (dispatch) {
     return (
       dispatch(updateUserCurrentCart(token))
     )
  };
};

/*
  Action to match local orders with TiendApp's orders.
  The need for this action exist after persisting
  the orders with redux-persist.
*/
export const updateAllOrders = (token) => {
  return function (dispatch) {
     return (
       dispatch(loadOrders(token))
     )
  };
};
