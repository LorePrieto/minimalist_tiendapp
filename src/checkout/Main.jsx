import React from 'react';
import { Redirect, Link, Route, Switch } from 'react-router-dom';
import Cart from './cart/Main.jsx';
import CustomerInformation from './customer_information/Main.jsx';
import PaymentMethod from './payment_method/Main.jsx';
import ShippingMethod from './shipping_method/Main.jsx';

const Main = ({match}) => {
return(
  <div id="checkout">
    <Switch>
      <Route exact path={`${match.path}`} component={CustomerInformation}/>
      <Route exact path={`${match.path}/payment_method`} component={PaymentMethod}/>
      <Route exact path={`${match.path}/shipping_method`} component={ShippingMethod}/>
    </Switch>
    <Route component={Cart}/>
  </div>
  )
}

export default Main;
