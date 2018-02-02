import { loadCartItems, removeAllItemsFromCart } from './cart.js';
import { loadOrders, removeAllOrders } from './orders.js';

export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const UPDATE_CURRENT_ORDER = 'UPDATE_CURRENT_ORDER';

/*
  Action to add a information to local user.
*/
export const addUser = (email, token, order_number, order_token) => {
  return {
    type: ADD_USER,
    email,
    token,
    order_number,
    order_token,
  };
};

/*
  Action to remove local user.
*/
export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

/*
  Action to update the local user current order saved in user
  so it match TiendApp's.
*/
export const updateCurrentOrder = (order_number, order_token) => {
  return {
    type: UPDATE_CURRENT_ORDER,
    order_number,
    order_token
  }
}

/*
  Action to login user using TiendApp's API and update local
  user information.
*/
export const loginUser = (email, password) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
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
      dispatch(addUser(email, responseJson.user.spree_api_key, responseJson.cart.number, responseJson.cart.guest_token));
      dispatch(loadCartItems(responseJson.cart.id));
      dispatch(loadOrders(responseJson.user.spree_api_key));
    });
  };
};

/*
  Action to logout user using TiendApp's API and update local
  user information. Note: cart is not deleted.
*/
export const logoutUser = () => {
  return function (dispatch) {
    return (
      dispatch(removeUser()),
      dispatch(removeAllOrders())
    )
  };
};

/*
  Action to fetch TiendApp's information about the login user and
  update local user and cart information.
*/
export const updateUserCurrentCart = (token) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/orders/mine', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Spree-Token': token
      })
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then((responseJson) => {
      responseJson.orders.forEach(order => {
        if (order.state === "cart"){
          dispatch(updateCurrentOrder(order.number, order.token));
          dispatch(loadCartItems(order.number));
        }
      });
    });
  }
}
