import { updateUserCurrentCart } from './user';
import { loadOrders } from './orders';

export const updateAllCart = (token) => {
  return function (dispatch) {
     return (
       dispatch(updateUserCurrentCart(token))
     )
  };
};

export const updateAllOrders = (token) => {
  return function (dispatch) {
     return (
       dispatch(loadOrders(token))
     )
  };
};
