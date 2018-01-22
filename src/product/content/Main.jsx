import React from 'react';
import { Route } from 'react-router-dom';
import ProductView from './ProductView.jsx';
import Footer from './../../shared/footer/Main.jsx';

const Main = ({match}) => {
return(
  <div id="content-product">
    <Route path={`${match.path}`} component={ProductView}/>
    <Route path={`${match.path}`} component={Footer}/>
  </div>
  )
}

export default Main;
