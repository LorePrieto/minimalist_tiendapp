import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import CartItem from './cartItem.jsx';

// Redux
import { connect } from 'react-redux';
import { cartSelector } from '../../selectors/cart';

class ProductsListItems extends React.Component {

  render() {
    const { cart } = this.props;

    return (
      <Grid container spacing={0}>
        {cart.map(product => (
          <CartItem cartItem={product} key={'cart'+product.local_id}/>
        ))}
      </Grid>
    );
  };
}

ProductsListItems.propTypes = {
  cart: PropTypes.array
};

const mapStateToProps = (state, props) => {
  return {
    cart: cartSelector(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsListItems);
