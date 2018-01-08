import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './landing/Main.jsx';
import Checkout from './checkout/Main.jsx';
import Product from './product/Main.jsx';
import Catalog from './catalog/Main.jsx';
import Cart from './cart/Main.jsx';
import Reboot from 'material-ui/Reboot';


class App extends Component {

  render() {

    return (
      <div id="main">
        <Reboot />
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/product" component={Product}/>
          <Route path="/catalog" component={Catalog}/>
          <Route path="/cart" component={Cart}/>
        </Switch>
      </div>
    );
  }
}
export default  App;
