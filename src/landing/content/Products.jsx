import React from 'react';
import  SimpleMediaCard  from './SimpleMediaCard.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

// Redux
import {connect} from 'react-redux';
import {addProduct} from '../../actions/products';
import {productsSelector} from '../../selectors/products';

const productsData = [
 {   id: 1,
     name: 'Taza Vidrio',
     img: '/images/taza1.png',
     variant: '',
     priceOrg: 5000,
     priceSale: 4000,
 },
 {   id: 2,
     name: 'Golden Monkey',
     img: '/images/te2.png',
     variant: '',
     priceOrg: 7000,
     priceSale: 7000,
 },
 {   id: 3,
     name: 'Tetera Pastel',
     img: '/images/tetera2.png',
     variant: '',
     priceOrg: 5000,
     priceSale: 3500,
 },
 {   id: 4,
     name: 'Infusión de Rosas',
     img: '/images/te1.png',
     variant: '',
     priceOrg: 4000,
     priceSale: 4000,
 },
 {   id: 5,
     name: 'Tazas Elegante',
     img: '/images/taza3.png',
     variant: '',
     priceOrg: 5000,
     priceSale: 5000,
 },
];

const styles = theme => ({
  root: {
    marginTop: 'none',
  },
  grid: {
    marginTop: 10,
  },
});

class Products extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.addProduct(1, "Bowie Mug", 999, '/images/taza1.png');
    this.props.addProduct(2, "Fran Mug", 999999, '/images/taza2.png');
  }

  render () {
    const { classes } = this.props;

    return (
      <Grid container spacing={40} className={classes.grid}>
        {this.props.products.map(product => (
          <Grid item key={product.name} xs={12} md={4}>
            <SimpleMediaCard data={product} key={product.id} />
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
    addProduct: (id, name, price, imgUrl) => dispatch(addProduct(id, name, price, imgUrl))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Products));
