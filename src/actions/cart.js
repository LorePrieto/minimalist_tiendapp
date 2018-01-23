export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const CHANGE_ITEM_QUANTITY = 'CHANGE_ITEM_QUANTITY';

export const addProductToCart = (local_id, name, img, variant, price, quantity, product_id) => {
  return {
    type: ADD_ITEM_TO_CART,
    local_id,
    name,
    img,
    variant,
    price,
    quantity,
    product_id
  };
};

export const removeItemFromCart = (local_id, price) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    local_id,
    price,
  };
};

export const changeItemQuantity = (local_id, price, quantity) => {
  return {
    type: CHANGE_ITEM_QUANTITY,
    local_id,
    price,
    quantity
  };
};
