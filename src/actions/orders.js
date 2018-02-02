export const ADD_ORDER = 'ADD_ORDER';
export const ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER';
export const ADD_PAYMENT_TO_ORDER = 'ADD_PAYMENT_TO_ORDER';
export const ADD_SHIPMENT_TO_ORDER = 'ADD_SHIPMENT_TO_ORDER';
export const REMOVE_ALL_ORDERS =  'REMOVE_ALL_ORDERS';

export const addOrder = (
  number,
  state,
  completed_at,
  payment_state,
  shipment_state,
  total,
  ship_total,
  adjustment_total,
  item_total,
  bill_full_name,
  bill_address1,
  bill_address2,
  bill_city,
  bill_zipcode,
  bill_state_name,
  bill_company,
  bill_country,
  bill_phone,
  ship_full_name,
  ship_address1,
  ship_address2,
  ship_city,
  ship_zipcode,
  ship_state_name,
  ship_company,
  ship_country,
  ship_phone
) => {
  return {
    type: ADD_ORDER,
    number,
    state,
    completed_at,
    payment_state,
    shipment_state,
    total,
    ship_total,
    adjustment_total,
    item_total,
    bill_full_name,
    bill_address1,
    bill_address2,
    bill_city,
    bill_zipcode,
    bill_state_name,
    bill_company,
    bill_country,
    bill_phone,
    ship_full_name,
    ship_address1,
    ship_address2,
    ship_city,
    ship_zipcode,
    ship_state_name,
    ship_company,
    ship_country,
    ship_phone
  };
};

export const addItemToOrder = (
  order_number,
  variant_id,
  quantity,
  price,
  total
) => {
  return{
    type: ADD_ITEM_TO_ORDER,
    order_number,
    variant_id,
    quantity,
    price,
    total
  };
};

export const addPaymentToOrder = (
  order_number,
  amount,
  name,
  state
) => {
  return {
      type: ADD_PAYMENT_TO_ORDER,
      order_number,
      amount,
      name,
      state
  };
};

export const addShipmentToOrder = (
  order_number,
  stock_location,
  cost,
  name,
  state
) => {
  return {
    type: ADD_SHIPMENT_TO_ORDER,
    order_number,
    stock_location,
    cost,
    name,
    state
  };
};

export const removeAllOrders = () => {
  return{
    type: REMOVE_ALL_ORDERS,
  };
};

export const loadOrders = (token) => {
  return function (dispatch) {
    return fetch('http://tutienda.lvh.me:4000/api/orders/mine', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Spree-Token': token
      })
    })
    .then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    )
    .then((responseJson) => {
      responseJson.orders.forEach( order => {
        dispatch(addOrder(
          order.number,
          order.state,
          order.completed_at,
          order.payment_state,
          order.shipment_state,
          order.total,
          order.ship_total,
          order.adjustment_total,
          order.item_total,
          order.bill_address.full_name,
          order.bill_address.address1,
          order.bill_address.address2,
          order.bill_address.city,
          order.bill_address.zipcode,
          order.bill_address.state.name,
          order.bill_address.company,
          order.bill_address.country.name,
          order.bill_address.phone,
          order.ship_address.full_name,
          order.ship_address.address1,
          order.ship_address.address2,
          order.ship_address.city,
          order.ship_address.zipcode,
          order.ship_address.state.name,
          order.ship_address.company,
          order.ship_address.country.name,
          order.ship_address.phone
        ));
        order.line_items.forEach(line_item => {
          dispatch(addItemToOrder(
            order.number,
            line_item.variant_id,
            line_item.quantity,
            line_item.price,
            line_item.total
          ));
        });
        order.payments.forEach(payment => {
          dispatch(addPaymentToOrder(
            order.number,
            payment.amount,
            payment.payment_method.name,
            payment.state
          ));
        });
        order.shipments.forEach(shipment => {
          dispatch(addShipmentToOrder(
            order.number,
            shipment.stock_location_name,
            shipment.cost,
            shipment.selected_shipping_rate.name,
            shipment.state
          ));
        });
      })
    });
  };
};
