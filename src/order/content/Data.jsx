import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

// Redux
import {connect} from 'react-redux';
import {orderSelector} from '../../selectors/orders';

const styles = theme => ({

});

class Data extends React.Component {
  render () {
    return (
      <p>Hello</p>
    );
  }
}

Data.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Data));
