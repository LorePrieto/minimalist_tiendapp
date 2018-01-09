import React from 'react';
import  SimpleMediaCard  from './SimpleMediaCard.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const productsData = [
 {   id: 1,
     name: 'Taza Vidrio',
     img: '/images/taza1.png',
     priceOrg: 5000,
     priceSale: 4000,
 },
 {   id: 2,
     name: 'Golden Monkey',
     img: '/images/te2.png',
     priceOrg: 7000,
     priceSale: 7000,
 },
 {   id: 3,
     name: 'Tetera Pastel',
     img: '/images/tetera2.png',
     priceOrg: 5000,
     priceSale: 3500,
 },
 {   id: 4,
     name: 'Infusión de Rosas',
     img: '/images/te1.png',
     priceOrg: 4000,
     priceSale: 4000,
 },
 {   id: 5,
     name: 'Tazas Elegante',
     img: '/images/taza3.png',
     priceOrg: 5000,
     priceSale: 5000,
 },
];

const styles = theme => ({
  root: {
    marginTop: 'none',
  },
});

function Products(props) {
  const { classes } = props;
  return (
    <Grid container spacing={40}>
      {productsData.map(product => (
        <Grid item key={product.name} item xs={12} md={4}>
          <SimpleMediaCard data= {product} key={product.id} />
        </Grid>
      ))}
    </Grid>
  );
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);
