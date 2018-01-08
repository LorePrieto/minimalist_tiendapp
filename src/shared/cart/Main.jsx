import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header.jsx';
import Products from './Products.jsx';
import Subtotal from './Subtotal.jsx';
import Checkout from './Checkout.jsx';


const Main = ({match}) => {
return(
  <div id="cart">
    <Route path={`${match.path}`} component={Header}/>
    <Route path={`${match.path}`} component={Products}/>
    <Route path={`${match.path}`} component={Subtotal}/>
    <Route path={`${match.path}`} component={Checkout}/>
  </div>
  )
}

export default Main;
