import {
    ADD_ITEM_TO_CART,
    ADD_TO_ITEM_QUANTITY,
    REMOVE_ITEM_FROM_CART,
    DEDUCT_FROM_ITEM_QUANTITY
} from '../actions/cart';

const cart = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
      case ADD_ITEM_TO_CART:
        const {local_id, price, quantity} = action;
        let exists = false;
        newState.forEach(entry => {
          if (entry.local_id === local_id && entry.price === price){
            entry.quantity = entry.quantity + quantity;
            exists = true;
          }
        });
        if (!exists){
          newState.push({local_id, price, quantity});
        }
        return newState;
      case REMOVE_ITEM_FROM_CART:
        return newState;
      case ADD_TO_ITEM_QUANTITY:
        return newState;
      case DEDUCT_FROM_ITEM_QUANTITY:
        return newState;
      default:
        return newState;
  }
}

export default cart;
