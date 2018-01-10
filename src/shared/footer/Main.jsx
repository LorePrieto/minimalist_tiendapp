import React from 'react';
import { Route } from 'react-router-dom';
import About from './About.jsx';
import Social from './Social.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
});

function Main(props) {
  const { classes } = props;
  const { match } = props;

  return (
    <div id="footer" className={classes.root}>
      <Grid container spacing={24}>
        <Route path={`${match.path}`} component={About}/>
        <Route path={`${match.path}`} component={Social}/>
      </Grid>
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
