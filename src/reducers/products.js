import {ADD_PRODUCT} from '../actions/products';

const products = (state=[], action) => {
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
  const newState = [...state];
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

export default products;
