import {ADD_PRODUCT} from '../actions/products';

const products = (state=[], action) => {
  const {name, price, imgUrl} = action;
  const newState = [...state];
  if(action.type === ADD_PRODUCT) {
    newState.push({name, priceOrg: price, img: imgUrl, priceSale: price});
  }
  return newState;
}

export default products;
