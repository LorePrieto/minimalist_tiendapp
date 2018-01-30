import React from 'react';
import { Route } from 'react-router-dom';
import Content from './content/Main.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Layout from './../shared/Layout.jsx'

const styles = theme => ({

});

class Main extends React.Component {

  render() {
    return (
      <Layout>
        <Route component={Content}/>
      </Layout>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Main);
