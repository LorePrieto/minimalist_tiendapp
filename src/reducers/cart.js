import {
    ADD_ITEM_TO_LOCAL_CART,
    REMOVE_ALL_ITEMS_FROM_CART,
} from '../actions/cart';

const cart = (state=[], action) => {
  const { type } = action;
  let newState = [...state];
  switch (type) {
      case ADD_ITEM_TO_LOCAL_CART: {
        const {
          line_item_id,
          variant_id,
          name,
          img,
          variant,
          price,
          quantity,
          product_id
        } = action;
        let exists = false;
        newState.forEach(entry => {
          if (entry.variant_id === variant_id && entry.price === price){
            entry.quantity = entry.quantity + quantity;
            exists = true;
          }
        });
        if (!exists){
          newState.push({
            line_item_id,
            variant_id,
            name,
            img,
            variant,
            price,
            quantity,
            product_id
          });
        }
        return newState;
      }
      case REMOVE_ALL_ITEMS_FROM_CART: {
        newState = [];
        return newState;
      }
      default:{
        return state;
      }
  }
}

export default cart;
