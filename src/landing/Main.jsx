import React from 'react';
import { Link, Route } from 'react-router-dom';
import Cart from './cart/Main.jsx';
import Content from './content/Main.jsx';
import Navbar from './navbar/Main.jsx';

const Main = ({match}) => {
return(
  <div>
    <Route path={`${match.path}`} component={Navbar}/>
    <Route path={`${match.path}`} component={Content}/>
    <Route path={`${match.path}`} component={Cart}/>
  </div>
  )
}

export default Main;
