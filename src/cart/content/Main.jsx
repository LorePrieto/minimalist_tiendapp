import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header.jsx';
import Products from './Products.jsx';
import Subtotal from './Subtotal.jsx';
import Checkout from './Checkout.jsx';
import Footer from './../../shared/footer/Main.jsx';

const Main = ({match}) => {
return(
  <div id="content-cart">
    <Route path={`${match.path}`} component={Header}/>
    <Route path={`${match.path}`} component={Products}/>
    <Route path={`${match.path}`} component={Subtotal}/>
    <Route path={`${match.path}`} component={Checkout}/>
    <Route path={`${match.path}`} component={Footer}/>
  </div>
  )
}

export default Main;
