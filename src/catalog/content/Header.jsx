import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IntegrationAutosuggest from './IntegrationAutosuggest.jsx';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3,
    boxShadow: 'none',
    textAlign: 'center',
  }),
  typography: {
    color: 'rgba(0,0,0,0.54)'
  },
});

function Header(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="headline" component="h3" className={classes.typography}>
          Catalog
        </Typography>
        <div>
          <IntegrationAutosuggest />
        </div>
      </Paper>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
