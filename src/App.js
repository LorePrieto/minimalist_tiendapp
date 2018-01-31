import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Landing from './landing/Main.jsx';
import Product from './product/Main.jsx';
import Catalog from './catalog/Main.jsx';
import Account from './account/Main.jsx';
import Static from './static/Main.jsx';
import Order from './order/Main.jsx';
import NoMatch from './noMatch/Main.jsx';
import Reboot from 'material-ui/Reboot';

// Redux
import {connect} from 'react-redux';
import {loadStore} from './actions/store';

class App extends Component {

  componentWillMount(){
    this.props.loadStore();
  }

  render() {
    return (
      <div id="main">
        <Reboot />
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/product/:product_id" component={Product}/>
          <Route path="/catalog" component={Catalog}/>
          <Route path="/account" component={Account}/>
          <Route path="/static" component={Static}/>
          <Route path="/order/:number" component={Order}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  loadStore: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStore: (public_key) => dispatch(loadStore(public_key)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
