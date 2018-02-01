import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CHANGE_ITEM_QUANTITY
} from '../actions/cart';

const cart = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
      case ADD_ITEM_TO_CART: {
        const {variant_id, name, img, variant, price, quantity, product_id} = action;
        let exists = false;
        newState.forEach(entry => {
          if (entry.variant_id === variant_id && entry.price === price){
            entry.quantity = entry.quantity + quantity;
            exists = true;
          }
        });
        if (!exists){
          newState.push({variant_id, name, img, variant, price, quantity, product_id});
        }
        return newState;
      }
      case REMOVE_ITEM_FROM_CART: {
        const { variant_id, price } = action;
        newState.forEach((item, index, object) => {
          if (item.variant_id === variant_id && item.price === price){
            object.splice(index, 1);
          }
        });
        return newState;
      }
      case CHANGE_ITEM_QUANTITY: {
        const {variant_id, price, quantity} = action;
        newState.forEach(entry => {
          if (entry.variant_id === variant_id && entry.price === price){
            entry.quantity = quantity;
          }
        });
        return newState;
      }
      default:{
        return state;
      }
  }
}

export default cart;
