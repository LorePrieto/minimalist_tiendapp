import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
    boxShadow: 'none',
  }),
  name: {
    color: 'rgba(0,0,0,0.54)',
  },
  category: {
    color: 'rgba(254,0,0,0.54)',
    fontSize: '1.2rem',
    marginBottom: 15,
  },
  price: {
    color: 'rgba(0,0,0,0.54)',
    fontSize: '1.5rem',
    marginTop: 15,
  },
  data: theme.mixins.gutters({
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center',
    boxShadow: 'none',
  }),
  divider: {
    width: 20,
    textAlign: 'center',
    margin: '0 auto',
  },
});

function Header(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="display1" className={classes.name}>
          {props.match.params.id} Golden Monkey
        </Typography>
        <Paper className={classes.data} elevation={4}>
          <Typography type="subheading" className={classes.category}>
            Finnest teas
          </Typography>
          <Divider className={classes.divider} />
          <Typography  type="display1" className={classes.price}>
            <strike>$ 8.000</strike><strong> $ 7.000</strong>
          </Typography>
        </Paper>
      </Paper>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
