import {ADD_PRODUCT, REMOVE_STOCK} from '../actions/products';

const products = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
    case REMOVE_STOCK: {
      const {local_id, quantity} = action;
      newState.forEach(product =>{
        if (product.id === local_id){
          product.variant.total_on_hand = product.variant.total_on_hand - quantity;
        }
      });
      return newState;
    }
    case ADD_PRODUCT:{
      const {
        id,
        product_id,
        name,
        description,
        image,
        available,
        taxon_ids,
        taxon_names,
        is_master,
        price,
        promotion_price,
        variant_id,
        total_on_hand,
        options_text,
        in_stock,
        is_backorderable,
      } = action;
      if(action.type === ADD_PRODUCT) {
        newState.push({
          id,
          product_id,
          name,
          description,
          image,
          available,
          taxon_ids,
          taxon_names,
          variant: {
            is_master,
            price,
            promotion_price,
            variant_id,
            total_on_hand,
            options_text,
            in_stock,
            is_backorderable,
          }
        });
      }
      return newState;
    }
    default:{
      return newState;
    }
  }
}

export default products;
