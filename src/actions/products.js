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
           product.id,
           product.name,
           product.plain_description === null ? "" : product.plain_description,
           product.master.images.length === 0 ? "https://hdwallsource.com/img/2014/6/free-animal-wallpaper-25043-25726-hd-wallpapers.jpg" : product.master.images[0].large_url,
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
             product.master.images.length === 0 ? "https://hdwallsource.com/img/2014/6/free-animal-wallpaper-25043-25726-hd-wallpapers.jpg" : product.master.images[0].large_url,
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
     });
   }
}
