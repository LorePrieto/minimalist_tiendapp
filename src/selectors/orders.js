export const ordersSelector = (state) => state.orders;

export const orderSelector = (state, id) => state.orders.filter(order => order.number === id)[0];
