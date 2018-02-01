export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY';

export const addProductToCart = (variant_id, name, img, variant, price, quantity, product_id) => {
  return {
    type: ADD_ITEM_TO_CART,
    variant_id,
    name,
    img,
    variant,
    price,
    quantity,
    product_id
  };
};

export const removeItemFromCart = (variant_id, price) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    variant_id,
    price,
  };
};

export const changeItemQuantity = (variant_id, price, quantity) => {
  return {
    type: CHANGE_ITEM_QUANTITY,
    variant_id,
    price,
    quantity
  };
};

export const loadCartItems = (cartID) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/orders/'+cartID)
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then( json => {
      json.line_items.forEach(item =>
        dispatch({
          type: ADD_ITEM_TO_CART,
          variant_id: item.variant.id,
          name: item.variant.name,
          img: item.variant.images.length === 0 ? "https://hdwallsource.com/img/2014/6/free-animal-wallpaper-25043-25726-hd-wallpapers.jpg" : item.variant.images[0].large_url,
          variant: item.variant.options_text,
          price: parseInt(item.variant.price,10),
          quantity: item.quantity,
          product_id: item.variant.product_id
        })
      );
    });
  }
}
