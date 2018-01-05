import React from 'react';
import { Link, Route } from 'react-router-dom';
import Content from './content/Main.jsx';
import Navbar from './../shared/navbar/Main.jsx';

const Main = ({match}) => {
return(
  <div id="cart">
    <Route path={`${match.path}`} component={Navbar}/>
    <Route path={`${match.path}`} component={Content}/>
  </div>
  )
}

export default Main;
