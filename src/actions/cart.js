export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';

export const ADD_TO_ITEM_QUANTITY = 'ADD_TO_ITEM_QUANTITY';
export const DEDUCT_FROM_ITEM_QUANTITY = 'DEDUCT_FROM_ITEM_QUANTITY';

/* Action Generators */
export const addProductToCart = (product_id, variant_id, quantity) => {
  return {
    type: ADD_ITEM_TO_CART,
    product_id,
    variant_id,
    quantity
  };
};

export const removeItemFromCart = (position, variant_id) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    position,
    variant_id
  };
};

export const addToItemQuantity = (position, variant_id) => {
  return {
    type: ADD_TO_ITEM_QUANTITY,
    position,
    variant_id
  };
};

export const deductFromItemQuantity = (position, variant_id) => {
  return {
    type: DEDUCT_FROM_ITEM_QUANTITY,
    position, 
    variant_id
  };
};

/* Dispatch Methods */
export const getAllProducts = () => dispatch => {
  /*
  let products = myData.products;
  products.map( product => (
    dispatch(addProduct(product.id, product.name, product.price, product.master.images[0].large_url))
  ));*/
}