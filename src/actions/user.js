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

// export const loginUser = (email, password) => {
//   return function (dispatch) {
//     return fetch('http://tutienda.lvh.me:4000/api/login', {
//       method: 'POST',
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//       body: JSON.stringify({
//         email,
//         password
//       }),
//     })
//     .then(
//       response => response.json(),
//       error => console.log('An error occurred.', error)
//     )
//     .then((responseJson) => {
//       dispatch(addUser(email, responseJson.cart.id))
//       .then( () => {
//         fetch('http://tutienda.lvh.me:4000/api/orders/'+responseJson.cart.id)
//         .then(
//           response => response.json(),
//           error => console.log('An error occurred.', error)
//         ).then( json => {
//           dispatch({
//             type: ADD_ITEM_TO_CART,
//             variant_id,
//             name,
//             img,
//             variant,
//             price,
//             quantity,
//             product_id
//           })
//         });
//       });
//     });
//   }
// }
