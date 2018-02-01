import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header.jsx';
import Data from './Data.jsx';
import Footer from './../../shared/footer/Main.jsx';

const Main = ({match}) => {
return(
  <div id="content-account">
    <Route path={`${match.path}`} component={Header}/>
    <Route path={`${match.path}`} component={Data}/>
    <Route path={`${match.path}`} component={Footer}/>
  </div>
  )
}

export default Main;
