import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

// Redux
import {connect} from 'react-redux';
import {orderSelector} from '../../selectors/orders';

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
  render() {
    const { classes, order } =this.props;

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="headline" component="h3" className={classes.typography}>
            Pedido: {order.number}
          </Typography>
        </Paper>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.object,
};

const mapStateToProps = (state, props) => {
  return {
    order: orderSelector(state, props.match.params.number),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
