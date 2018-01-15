export const ADD_PRODUCT = 'ADD_PRODUCT';

export const addProduct = (id, name, price, imgUrl) => {
  return {
    type: ADD_PRODUCT,
    name,
    id,
    price,
    imgUrl
  };
};
