import React from 'react';
import { Route } from 'react-router-dom';
import ProductView from './ProductView.jsx';
import Footer from './../../shared/footer/Main.jsx';


class Main extends React.Component {
  render (){
    return(
      <div id="content-product">
        <Route path={`${this.props.match.path}`} component={ProductView}/>
        <Route path={`${this.props.match.path}`} component={Footer}/>
      </div>
    )
  }
}

export default Main;
