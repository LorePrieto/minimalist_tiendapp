import React, { Component } from 'react';
import { Redirect, Link, Route,Switch } from 'react-router-dom';
import Main from './landing/Main.jsx';
import Checkout from './checkout/Main.jsx';
import Product from './product/Main.jsx';
import Catalog from './catalog/Main.jsx';


class App extends Component {

  render() {

    return (
      <div>
       <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/checkout" component={Checkout}/>
        <Route exact path="/product" component={Product}/>
        <Route exact path="/catalog" component={Catalog}/>
       </Switch>
      </div>
    );
  }
}
export default  App;
