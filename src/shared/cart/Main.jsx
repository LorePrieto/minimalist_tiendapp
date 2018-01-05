import React from 'react';
import { Link, Route } from 'react-router-dom';
import Products from './Products.jsx';
import Subtotal from './Subtotal.jsx';
import Checkout from './Checkout.jsx';


const Main = ({match}) => {
return(
  <div id="content">
    <Route path={`${match.path}`} component={Products}/>
    <Route path={`${match.path}`} component={Subtotal}/>
    <Route path={`${match.path}`} component={Checkout}/>
  </div>
  )
}

export default Main;
