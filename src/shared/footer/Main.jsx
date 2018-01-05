import React from 'react';
import { Link, Route } from 'react-router-dom';
import About from './About.jsx';
import Social from './Social.jsx';

const Main = ({match}) => {
return(
  <div id="footer">
    <Route path={`${match.path}`} component={About}/>
    <Route path={`${match.path}`} component={Social}/>
  </div>
  )
}

export default Main;
