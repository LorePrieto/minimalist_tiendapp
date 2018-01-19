import myData from './products.json'

let cont = 0;
export const ADD_PRODUCT = 'ADD_PRODUCT';

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

export const getAllProducts = () => dispatch => {
  let products = myData.products;
  products.map( product => (
    dispatch(addProduct(
      cont++,
      product.id,
      product.name,
      product.description === null ? "" : product.description,
      product.master.images.length === 0 ? "http://via.placeholder.com/350x150" : product.master.images[0].large_url,
      product.available_on <= Date(),
      product.taxon_ids,
      product.taxon_names,
      true,
      product.master.price,
      product.master.promo_price === null ? product.master.price : product.master.promo_price,
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
        product.description,
        product.master.images.length === 0 ? "http://via.placeholder.com/350x150" : product.master.images[0].large_url,
        product.available_on <= Date(),
        product.taxon_ids,
        product.taxon_names,
        false,
        variant.price,
        variant.promo_price === null ? variant.price : variant.promo_price,
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
