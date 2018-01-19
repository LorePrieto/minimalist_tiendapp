import React from 'react';
import  SimpleMediaCard  from './SimpleMediaCard.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

// Redux
import {connect} from 'react-redux';
import {addProduct, getAllProducts} from '../../actions/products';
import {productsSelector} from '../../selectors/products';

const styles = theme => ({
  root: {
    marginTop: 'none',
  },
  grid: {
    marginTop: 10,
  },
});

class Products extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render () {
    const { classes } = this.props;
    console.log(this.props.products);

    return (
      <Grid container spacing={40} className={classes.grid}>
        {this.props.products.map(product => (
          <Grid item key={product.name} xs={12} md={4}>
            <Link to={'/product/'+product.id} style={{textDecoration: 'none'}}>
              <SimpleMediaCard data= {product} key={product.id} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }
}

Products.propTypes = {
  addProduct: PropTypes.func,
  classes: PropTypes.object.isRequired,
  products: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    products: productsSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (id, name, price, imgUrl, variants, categories) => dispatch(addProduct(id, name, price, imgUrl, variants, categories)),
    getAllProducts: () => dispatch(getAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Products));
