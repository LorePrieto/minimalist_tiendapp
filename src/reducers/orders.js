import {
    ADD_ORDER,
    ADD_ITEM_TO_ORDER,
    ADD_PAYMENT_TO_ORDER,
    ADD_SHIPMENT_TO_ORDER,
    REMOVE_ALL_ORDERS,
} from '../actions/orders';

const orders = (state=[], action) => {
  const { type } = action;
  let newState = [...state];
  switch (type) {
      case ADD_ORDER: {
        const {
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
        } = action;
        newState.push({
          number,
          state,
          completed_at,
          payment_state,
          shipment_state,
          total,
          ship_total,
          adjustment_total,
          item_total,
          bill: {
            full_name: bill_full_name,
            address1: bill_address1,
            address2: bill_address2,
            city: bill_city,
            zipcode: bill_zipcode,
            state_name: bill_state_name,
            company: bill_company,
            country: bill_country,
            phone: bill_phone
          },
          ship: {
            full_name: ship_full_name,
            address1: ship_address1,
            address2: ship_address2,
            city: ship_city,
            zipcode: ship_zipcode,
            state_name: ship_state_name,
            company: ship_company,
            country: ship_country,
            phone: ship_phone
          },
          items: [],
          payments: [],
          shipments: []
        });
        return newState;
      }
      case ADD_ITEM_TO_ORDER: {
        const {
          order_number,
          variant_id,
          quantity,
          price,
          total
        } = action;
        newState.forEach(entry => {
          if (entry.number === order_number){
            entry.items.push({
              variant_id,
              quantity,
              price,
              total
            });
          }
        });
        return newState;
      }
      case ADD_PAYMENT_TO_ORDER: {
        const {
          order_number,
          amount,
          name,
          state
        } = action;
        newState.forEach(entry => {
          if (entry.number === order_number){
            entry.payments.push({
              amount,
              name,
              state
            });
          }
        });
        return newState;
      }
      case ADD_SHIPMENT_TO_ORDER: {
        const {
          order_number,
          stock_location,
          cost,
          name,
          state
        } = action;
        newState.forEach(entry => {
          if (entry.number === order_number){
            entry.shipments.push({
              stock_location,
              cost,
              name,
              state
            });
          }
        });
        return newState;
      }
      case REMOVE_ALL_ORDERS: {
        newState = [];
        return newState;
      }
      default:{
        return state;
      }
  }
}

export default orders;
