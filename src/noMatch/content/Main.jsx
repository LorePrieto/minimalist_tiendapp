import React from 'react';
import { Route } from 'react-router-dom';
import Message from './Message.jsx';
import Footer from './../../shared/footer/Main.jsx';

const Main = ({match}) => {
return(
  <div id="content-product">
    <Route path={`${match.path}`} component={Message}/>
  </div>
  )
}

export default Main;
