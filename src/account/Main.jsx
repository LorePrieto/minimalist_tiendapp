import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Content from './content/Main.jsx';
import PropTypes from 'prop-types';
import Layout from './../shared/Layout.jsx'

// Redux
import {connect} from 'react-redux';
import {userSelector} from '../selectors/user';

class Main extends React.Component {
  render() {
    const { user } = this.props;
    
    if (user) {
      return (
        <Layout>
          <Route path={`${this.props.match.path}`} component={Content}/>
        </Layout>
      );
    }else {
      return (
        <Redirect to='/' />
      );
    }
  }
}

Main.propTypes = {
  user: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    user: userSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
