import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

// Redux
import {connect} from 'react-redux';
import { logoutUser } from '../../actions/user.js';

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
  button: {
    marginTop: 20,
    paddingRight: 100,
    paddingLeft: 100,
    backgroundColor: 'rgba(254,0,0,0.54)',
    color: 'white',
  },
});

class Header extends React.Component {

  handleLogoutClick = event =>{
    this.props.logoutUser();
  };

  render() {
    const { classes } =this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="headline" component="h3" className={classes.typography}>
            Tu cuenta
          </Typography>
          <Button size="small" raised className={classes.button} onClick={this.handleLogoutClick}>
            Cerrar sessión
          </Button>
        </Paper>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
