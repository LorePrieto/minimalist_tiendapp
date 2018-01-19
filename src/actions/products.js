import myData from './products.json'
export const ADD_PRODUCT = 'ADD_PRODUCT';

export const addProduct = (id, name, price, imgUrl, variants, categories) => {
  return {
    type: ADD_PRODUCT,
    name,
    id,
    price,
    imgUrl,
    variants,
    categories
  };
};

export const getAllProducts = () => dispatch => {
  let products = myData.products;
  products.map( product => (
    dispatch(addProduct(product.id, product.name, product.price, product.master.images[0].large_url, product.variants, product.taxon_names))
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
