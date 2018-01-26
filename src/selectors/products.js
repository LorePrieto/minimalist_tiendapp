import { createSelector } from 'reselect';

export const productsSelector = (state) => state.products;

export const productSelector = (state, id) => state.products[id];

const is_master = (product) => {
  return product.is_master
};

export const masterProductsSelector = createSelector(
  productsSelector,
  (products) => products.filter(is_master)
);

export const featureProductsSelector = createSelector(
  masterProductsSelector,
  (products) => products.slice(0,6)
);

export const variantsProductsSelector = createSelector(
    productsSelector,
    productSelector,
    (products, product) => products.filter(prod => !prod.is_master && prod.product_id === product.product_id)
);
