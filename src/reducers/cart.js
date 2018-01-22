import { 
    ADD_ITEM_TO_CART, 
    ADD_TO_ITEM_QUANTITY, 
    REMOVE_ITEM_FROM_CART, 
    DEDUCT_FROM_ITEM_QUANTITY 
} from '../actions/cart';

const cart = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (action.type) {
      case ADD_ITEM_TO_CART:
          const {local_id, price, quantity} = action;
          //Do something
          break;
      default:
          return(newState);
  }
}

export default cart;
