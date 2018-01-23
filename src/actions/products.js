import myData from './products.json'

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_STOCK = 'REMOVE_STOCK';

export const addProduct = (
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
) => {
  return {
    type: ADD_PRODUCT,
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
  };
};

export const changeStock = (local_id, quantity) =>{
  return{
    type: REMOVE_STOCK,
    local_id,
    quantity
  }
}

let cont = 0;
export const getAllProducts = () => dispatch => {
  let products = myData.products;
  products.map( product => (
    dispatch(addProduct(
      cont++,
      product.id,
      product.name,
      product.plain_description === null ? "" : product.plain_description,
      product.master.images.length === 0 ? "http://via.placeholder.com/350x150" : product.master.images[0].large_url,
      product.available_on <= Date(),
      product.taxon_ids,
      product.taxon_names,
      true,
      parseInt(product.master.price, 10),
      product.master.promo_price === null ? parseInt(product.master.price, 10) : parseInt(product.master.promo_price, 10),
      product.master.id,
      product.master.total_on_hand,
      product.master.options_text,
      product.master.in_stock,
      product.master.is_backorderable
    ))
  ));
  products.map( product => (
    product.variants.map(variant =>
      dispatch(addProduct(
        cont++,
        product.id,
        product.name,
        product.plain_description,
        product.master.images.length === 0 ? "http://via.placeholder.com/350x150" : product.master.images[0].large_url,
        product.available_on <= Date(),
        product.taxon_ids,
        product.taxon_names,
        false,
        parseInt(variant.price, 10),
        variant.promo_price === null ? parseInt(variant.price, 10) : parseInt(variant.promo_price, 10),
        variant.id,
        variant.total_on_hand,
        variant.options_text,
        variant.in_stock,
        variant.is_backorderable
      ))
    )
  ));
}

// function getProductsFromApiAsync() {
//    return fetch('http://demo.tiendapp.cl/api/products.json')
//    .then((response) => response.json())
//    .then((responseJson) => {
//      return responseJson;
//    })
//    .catch((error) => {
//      console.error(error);
//    });
// }
