import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardMedia } from 'material-ui/Card';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { grey } from 'material-ui/colors';
import Button from 'material-ui/Button';
import VariantSelector from './VariantSelector.jsx';
import Typography from 'material-ui/Typography';
import QuantitySelector from './QuantitySelector.jsx';
import Header from './Header.jsx';

// Redux
import {connect} from 'react-redux';
import {addProduct} from '../../actions/products';
import {addProductToCart} from '../../actions/cart';
import {productSelector, variantsProductsSelector} from '../../selectors/products';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    width: '80%',
    margin: '0 auto',
    boxShadow: 'none',
  },
  media: {
    height: 400,
    borderRadius: 40,
  },
  textField: {
    width: '90%',
  },
  button: {
    width: '90%',
    backgroundColor: 'rgba(254, 0, 0, 0.7)',
    color: 'white',
  },
  description: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
    width: '90%',
    boxShadow: 'none',
  }),
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
  }
});

/* TODO: product must know itself */
class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: '1',
      id: ''
    };
    this.onQuantityClickHanlder =  this.onQuantityClickHanlder.bind(this);
    this.onAddToCartHandler =  this.onAddToCartHandler.bind(this);
  }

  onQuantityClickHanlder = name => event => {
    if (event.target.value > 0) {
      this.setState({
          [name]: event.target.value,
      });
    }
  }

  onAddToCartHandler() {
    //const {cart} = this.context;
    console.log(this.state.qty);
  };

  render(){
    const { classes, product, variants} = this.props;

    let variantNames = [];
    variants.map(variant =>
      variantNames.push({variant: variant.variant.options_text})
    );

    let variantHtml;
    if (variants.length === 0)
      variantHtml = <div id="variants"></div>;
    else
      variantHtml = <div style={{width: '100%'}}><VariantSelector variants={variantNames}/></div>;

    if (product.variant.is_master)
      return (
        <MuiThemeProvider theme={theme}>
          <Header product={product}/>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={5}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.name}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={7}>
                {variantHtml}
                <div style={{width: '100%'}}>
                  <QuantitySelector onQuantityClickHanlder={this.onQuantityClickHanlder} value={this.state.qty}/>
                </div>
                <div style={{width: '100%'}}>
                  <Button raised className={classes.button} onClick={this.onAddToCartHandler}>
                    Add to Cart
                </Button>
                </div>
                <div style={{width: '100%'}}>
                  <Paper className={classes.description} elevation={4}>
                    <Typography component="p">
                      Paper can be used to build surface or other elements for your application. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                  </Paper>
                </div>
              </Grid>
            </Grid>
          </div>
        </MuiThemeProvider>
      );
    else{
      return (<Redirect to="/nomatch"/>);
    }
  }
}

ProductView.propTypes = {
  addProduct: PropTypes.func,
  addProductToCart: PropTypes.func,
  classes: PropTypes.object.isRequired,
  products: PropTypes.array
};

const mapStateToProps = (state, props) => {
  return {
    product: productSelector(state, props.match.params.id),
    variants: variantsProductsSelector(state, props.match.params.id)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (id, name, price, imgUrl, variants, categories) => dispatch(addProduct(id, name, price, imgUrl, variants, categories)),
    addProductToCart: (product_id, variant_id, quantity) => dispatch(addProductToCart(product_id, variant_id, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductView));

