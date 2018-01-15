import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import TextField from 'material-ui/TextField';
import QuantitySelector from './QuantitySelector.jsx';
import { Link } from 'react-router-dom';

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
      display: 'inline-table',
      width: 151,
      height: 151,
      borderRadius: 40,
    },
  },
  product: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  textField: {
    width: '80%',
  },
});

const productsData = [
 {   id: 1,
     name: 'Taza Vidrio',
     img: '/images/taza1.png',
     variant: 'Mediana',
     price: 4000,
     qty: 2,
 },
 {   id: 2,
     name: 'Golden Monkey Yo soy muy largo',
     variant: '100g',
     img: '/images/te2.png',
     price: 7000,
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
            <Grid container justify="center" spacing={16}>
              <Grid item xs={8} >
                <a href={'/product/'+product.id} style={{textDecoration: 'none'}}>
                  <Card className={classes.card}>
                    <div className={classes.details}>
                      <CardMedia
                        className={classes.cover}
                        image={product.img}
                        title={product.name + ' ' + product.variant}
                      />
                      <CardContent className={classes.content}>
                        <Typography type="headline" color="secondary" >{product.name}</Typography>
                        <Typography type="subheading" color="secondary">
                          {product.variant}
                        </Typography>
                        <br/>
                        <Typography type="body2" color="secondary">{'Price: $ ' + product.price}</Typography>
                      </CardContent>
                    </div>
                  </Card>
                </a>
              </Grid>
              <Grid item xs={3} style={{displayFelx:"column"}}>
                <br/>
                <Typography type="subheading" color="secondary">{'Total: $ ' + (product.qty*product.price)}</Typography>
                <br/>
                <QuantitySelector />
              </Grid>
              <Grid item xs={1}>
                <IconButton className={classes.delete}>
                  <DeleteIcon />
                </IconButton>
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
