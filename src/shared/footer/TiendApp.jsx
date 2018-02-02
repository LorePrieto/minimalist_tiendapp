import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  paper: {
    padding: 16,
    boxShadow: 'none',
    width: '100%',
  },
  typography: {
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
  },
  divider: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

function TiendApp(props) {
  const { classes } = props;

  return (
      <Paper className={classes.paper}>
        <Typography component="p" className={classes.typography}>
          Hecho en <strong><a href="http://tiendapp.cl" rel="noopener noreferrer" target="_blank" style={{textDecoration: 'none', color: 'rgba(0,0,0,0.54)'}}>TiendApp</a></strong>&reg;
        </Typography>
      </Paper>
  );
}

TiendApp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TiendApp);
