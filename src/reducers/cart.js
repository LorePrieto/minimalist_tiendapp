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
        const {local_id, name, img, variant, price, quantity, product_id} = action;
        let exists = false;
        newState.forEach(entry => {
          if (entry.local_id === local_id && entry.price === price){
            entry.quantity = entry.quantity + quantity;
            exists = true;
          }
        });
        if (!exists){
          newState.push({local_id, name, img, variant, price, quantity, product_id});
        }
        return newState;
      }
      case REMOVE_ITEM_FROM_CART: {
        return newState;
      }
      case CHANGE_ITEM_QUANTITY: {
        const {local_id, price, quantity} = action;
        newState.forEach(entry => {
          if (entry.local_id === local_id && entry.price === price){
            entry.quantity = quantity;
          }
        });
        return newState;
      }
      default:{
        return newState;
      }
  }
}

export default cart;
