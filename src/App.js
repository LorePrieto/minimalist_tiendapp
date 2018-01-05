import React, { Component } from 'react';
import { Redirect, Link, Route,Switch } from 'react-router-dom';
import Main from './landing/Main';
import Checkout from './checkout/Main';
import Product from './product/Main';


class App extends Component {

  render() {

    return (
      <div>
       <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/checkout" component={Checkout}/>
        <Route exact path="/product" component={Product}/>
       </Switch>
      </div>
    );
  }
}
export default  App;
