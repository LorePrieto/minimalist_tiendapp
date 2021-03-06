import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';


const styles = {
  card: {
    backgroundColor: 'white',
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 400,
    borderRadius: 40,
  },
  typography: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 'lighter',
    textAlign: 'center',
  },
  typography2: {
    color: 'rgba(254, 0, 0, 0.54)',
    fontWeight: 'lighter',
    textAlign: 'center',
  },
};

function SimpleMediaCard(props) {
  const { product, classes } = props;

  let price;
  if(product.price === product.promotion_price)
    price = <div><strong> $ {product.price}</strong></div>;
  else
    price = <div><strike>$ {product.price}</strike><strong> $ {product.promotion_price}</strong></div>;

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography type="body2" component="h2" className={classes.typography}>
            {product.name}
          </Typography>
          <Typography type="body2" component="h2" className={classes.typography2}>
            {price}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object,
};

export default withStyles(styles)(SimpleMediaCard);
