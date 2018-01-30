import {ADD_ITEM_TO_CART} from './cart.js';

export const ADD_USER = 'ADD_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const addUser = (email, cartID) => {
  return {
    type: LOGIN_USER,
    email,
    cartID
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
}

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
      dispatch(addUser(email, responseJson.cart.id))
      fetch('http://tutienda.lvh.me:4000/api/orders/'+responseJson.cart.id)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      ).then( json => {
        const items = json.line_items;
        items.forEach(item =>
          dispatch({
            type: ADD_ITEM_TO_CART,
            variant_id: item.variant.id,
            name: item.variant.name,
            img: item.variant.images.length === 0 ? "https://hdwallsource.com/img/2014/6/free-animal-wallpaper-25043-25726-hd-wallpapers.jpg" : item.variant.images[0].large_url,
            variant: item.variant.options_text,
            price: item.variant.price,
            quantity: item.quantity,
            product_id: item.variant.product_id
          })
        );
      });
    });
  }
}
