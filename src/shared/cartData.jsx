import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider'

const styles = theme => ({
  card: {
    display: 'flex',
    boxShadow: 'none',
  },
  details: {
    display: 'flex',
  },
  content: {
  },
  cover: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: 151,
      height: 151,
    },
  },
  product: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});

const productsData = [
 {   id: 1,
     name: 'Taza Vidrio',
     img: '/images/taza1.png',
     variant: 'Mediana',
     priceSale: 4000,
     qty: 2,
 },
 {   id: 2,
     name: 'Golden Monkey',
     variant: '100g',
     img: '/images/te2.png',
     priceSale: 7000,
     qty: 1,
 },
];

function ProductsListItems(props) {
  const { classes } = props;

  return (
    <Grid container spacing={0}>
      {productsData.map(product => (
        <div key={product.id + '-div'}style={{width: '100%'}}>
          <Grid item key={product.id} xs={12} className={classes.product}>
            <Grid container justify="center" spacing={0}>
              <Grid item xs={8}>
                <Card className={classes.card}>
                  <div className={classes.details}>
                    <CardMedia
                      className={classes.cover}
                      image={product.img}
                      title="Live from space album cover"
                    />
                    <CardContent className={classes.content}>
                      <Typography type="headline" color="secondary">{product.name}</Typography>
                      <Typography type="subheading" color="secondary">
                        {product.variant}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
              <Grid item xs={2}>
                <p>2</p>
              </Grid>
              <Grid item xs={2}>
                <p>3</p>
              </Grid>
            </Grid>
          </Grid>
          <Divider style={{margin: 10}} />
        </div>
      ))}
    </Grid>
  );
}

ProductsListItems.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProductsListItems);
