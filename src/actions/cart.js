export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

export const ADD_TO_ITEM_QUANTITY = 'ADD_TO_ITEM_QUANTITY';
export const DEDUCT_FROM_ITEM_QUANTITY = 'DEDUCT_FROM_ITEM_QUANTITY';

/* Action Generators */
export const addProductToCart = (local_id, price, quantity) => {
  return {
    type: ADD_ITEM_TO_CART,
    local_id,
    price,
    quantity
  };
};

export const removeItemFromCart = (local_id) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    local_id
  };
};

export const addToItemQuantity = (local_id) => {
  return {
    type: ADD_TO_ITEM_QUANTITY,
    local_id
  };
};

export const deductFromItemQuantity = (local_id) => {
  return {
    type: DEDUCT_FROM_ITEM_QUANTITY,
    local_id
  };
};
