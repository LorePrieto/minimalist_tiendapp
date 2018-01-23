export const cartSelector = (state) => state.cart;

export const getSubtotal = (state) =>{
  let count = 0;
  state.cart.map(cartItem =>{
    count = count + (cartItem.price*cartItem.quantity)
  });
  return count;
}
