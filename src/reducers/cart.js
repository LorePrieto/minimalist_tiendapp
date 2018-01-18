import { 
    ADD_ITEM_TO_CART, 
    ADD_TO_ITEM_QUANTITY, 
    REMOVE_ITEM_FROM_CART, 
    DEDUCT_FROM_ITEM_QUANTITY 
} from '../actions/cart';

/* Handle different actions */
const handleAddItemToCart = (product_id, variant_id, quantity, newState) => {
    newState.push({product_id, variant_id, quantity});
    return newState;
}

const cart = (state=[], action) => {
  const {product_id, variant_id, quantity} = action;
  const newState = [...state];
  switch (action.type) {
      case ADD_ITEM_TO_CART:
          handleAddItemToCart()
          break;
  
      default:
          return(newState);
  }
}

export default cart;