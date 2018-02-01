import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  paper: {
    padding: 16,
    boxShadow: 'none',
  },
  title: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  typography: {
    textIndent: 50,
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'justify',
  },
  divider: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

function About(props) {
  const { classes } = props;

  return (
      <Grid item xs={12} md={8}>
        <Divider className={classes.divider}/>
        <Paper className={classes.paper}>
          <Typography type="headline" component="h3" className={classes.title}>
            Sobre nosotros
          </Typography>
          <Typography component="p" className={classes.typography}>
            Paper can be used to build surface or other elements for your application.
            Paper can be used to build surface or other elements for your application.
            Paper can be used to build surface or other elements for your application.
            Paper can be used to build surface or other elements for your application.
          </Typography>
          <Typography component="p" className={classes.typography}>
            Paper can be used to build surface or other elements for your application.
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>
      </Grid>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
