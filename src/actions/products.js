export const ADD_PRODUCT = 'ADD_PRODUCT';
export const CHANGE_STOCK = 'CHANGE_STOCK';

/*
  Action to add a local product.
  TiendApp's variants are call products within this app.
  Meaning that for each TiendApp's product one local product is created
  for its master variant and other local products for each of its variants.
*/
export const addProduct = (
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
) => {
  return {
    type: ADD_PRODUCT,
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
  };
};

/*
  Action to update stock of the local product when a
  product is added to the cart or its quantity is
  updated in the local cart.
*/
export const changeStock = (variant_id, quantity) =>{
  return{
    type: CHANGE_STOCK,
    variant_id,
    quantity
  }
}

/*
  Action to fetch all TiendApp's products and add them
  to local products.
*/
let cont = 0;
export const getAllProducts = () => {
  return function (dispatch) {
     return fetch('http://tutienda.lvh.me:4000/api/products.json')
     .then(
       response => response.json(),
       error => console.log('An error occurred.', error)
     )
     .then((responseJson) => {
       const products = responseJson.products;
       products.map( product => (
         dispatch(addProduct(
           cont++,
           product.master.id,
           product.id,
           product.name,
           product.plain_description === null ? "" : product.plain_description,
           product.master.images.length === 0 ? "https://hdwallsource.com/img/2014/6/free-animal-wallpaper-25043-25726-hd-wallpapers.jpg" : product.master.images[0].large_url,
           product.available_on <= Date(),
           product.taxon_ids,
           product.taxon_names,
           product.has_variants,
           true,
           parseInt(product.master.price, 10),
           product.master.promo_price === null ? parseInt(product.master.price, 10) : parseInt(product.master.promo_price, 10),
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
             variant.id,
             product.id,
             product.name,
             product.plain_description,
             product.master.images.length === 0 ? "https://hdwallsource.com/img/2014/6/free-animal-wallpaper-25043-25726-hd-wallpapers.jpg" : product.master.images[0].large_url,
             product.available_on <= Date(),
             product.taxon_ids,
             product.taxon_names,
             true,
             false,
             parseInt(variant.price, 10),
             variant.promo_price === null ? parseInt(variant.price, 10) : parseInt(variant.promo_price, 10),
             variant.total_on_hand,
             variant.options_text,
             variant.in_stock,
             variant.is_backorderable
           ))
         )
       ));
     });
   }
}
