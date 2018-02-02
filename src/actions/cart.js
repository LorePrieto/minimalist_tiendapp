export const ADD_ITEM_TO_LOCAL_CART = 'ADD_ITEM_TO_LOCAL_CART';
export const REMOVE_ALL_ITEMS_FROM_CART = 'REMOVE_ALL_ITEMS_FROM_CART';

/*
  Action to add a product to TiendApp's cart (uses API)
  after local cart items are reloaded to match TiendApp's cart.
*/
export const addProductToCart = (order_number, order_token, variant_id, quantity) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/orders/'+order_number+'/line_items', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        order_token: order_token,
        line_item: {
          variant_id: variant_id,
          quantity: quantity
        }
      }),
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then( json => (
      dispatch(loadCartItems(order_number))
    ));
  };
};

/*
  Action to remove a product to TiendApp's cart (uses API)
  after local cart items are reloaded to match TiendApp's cart.
*/
export const removeItemFromCart = (order_number, line_item_id) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/orders/'+order_number+'/line_items/'+line_item_id, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(
      error => console.log('An error occurred.', error)
    )
    .then( json => (
      dispatch(loadCartItems(order_number))
    ));
  };
};

/*
  Action to change a product quantity in TiendApp's cart (uses API)
  after local cart items are reloaded to match TiendApp's cart.
*/
export const changeItemQuantity = (order_number, order_token, line_item_id, variant_id, quantity) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/orders/'+order_number+'/line_items/'+line_item_id, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        order_token: order_token,
        line_item: {
          variant_id: variant_id,
          quantity: quantity
        }
      }),
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then( json => (
      dispatch(loadCartItems(order_number))
    ));
  };
};

/*
  Action to add a item to local cart
*/
export const addItemToLocalCart = (line_item_id, variant_id, name, img, variant, price, quantity, product_id) => {
  return {
    type: ADD_ITEM_TO_LOCAL_CART,
    line_item_id,
    variant_id,
    name,
    img,
    variant,
    price,
    quantity,
    product_id
  };
};

/*
  Action to remove all items from local cart
*/
export const removeAllItemsFromCart = () => {
  return {
    type: REMOVE_ALL_ITEMS_FROM_CART
  };
};

/*
  Action to match local cart items with TiendApp's cart.
*/
export const loadCartItems = (order_number) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/orders/'+order_number)
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then( json => {
      dispatch(removeAllItemsFromCart());
      json.line_items.forEach(item =>
        dispatch(addItemToLocalCart(
          item.id,
          item.variant.id,
          item.variant.name,
          item.variant.images.length === 0 ? "https://hdwallsource.com/img/2014/6/free-animal-wallpaper-25043-25726-hd-wallpapers.jpg" : item.variant.images[0].large_url,
          item.variant.options_text,
          parseInt(item.variant.price,10),
          item.quantity,
          item.variant.product_id
        ))
      );
    });
  };
};
