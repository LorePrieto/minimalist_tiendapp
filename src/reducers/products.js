import {ADD_PRODUCT, CHANGE_STOCK} from '../actions/products';

const products = (state=[], action) => {
  const { type } = action;
  const newState = [...state];
  switch (type) {
    case CHANGE_STOCK: {
      const {variant_id, quantity} = action;
      newState.forEach(product =>{
        if (product.variant_id === variant_id){
          product.total_on_hand = product.total_on_hand - quantity;
        }
      });
      return newState;
    }
    case ADD_PRODUCT:{
      const {
        id,
        variant_id,
        product_id,
        name,
        description,
        image,
        available,
        taxon_ids,
        taxon_names,
        has_variants,
        is_master,
        price,
        promotion_price,
        total_on_hand,
        options_text,
        in_stock,
        is_backorderable,
      } = action;
      if(action.type === ADD_PRODUCT) {
        newState.push({
          id,
          variant_id,
          product_id,
          name,
          description,
          image,
          available,
          taxon_ids,
          taxon_names,
          has_variants,
          is_master,
          price,
          promotion_price,
          total_on_hand,
          options_text,
          in_stock,
          is_backorderable,
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
