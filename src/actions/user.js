import { loadCartItems } from './cart.js';
import { loadOrders, removeAllOrders } from './orders.js';

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const addUser = (email, cartID, token) => {
  return {
    type: ADD_USER,
    email,
    cartID,
    token
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const loginUser = (email, password) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email,
        password
      }),
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then((responseJson) => {
      dispatch(addUser(email, responseJson.cart.id, responseJson.user.spree_api_key));
      dispatch(loadCartItems(responseJson.cart.id));
      dispatch(loadOrders(responseJson.user.spree_api_key));
    });
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    return (dispatch(removeUser()),
      dispatch(removeAllOrders())
    )
  }
}
