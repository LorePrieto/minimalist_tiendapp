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
import {addProduct, changeStock} from '../../actions/products';
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

class ProductView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: '1',
      id: this.props.variants.length > 0 ? this.props.variants[0].id : this.props.product.id,
    };
    this.onQuantityClickHandler =  this.onQuantityClickHandler.bind(this);
    this.onAddToCartHandler =  this.onAddToCartHandler.bind(this);
    this.onVariantClickHandler =  this.onVariantClickHandler.bind(this);
  }

  onQuantityClickHandler = () => event => {
    if (event.target.value > 0) {
      this.setState({
          qty: event.target.value,
      });
    }
  }

  onVariantClickHandler = () => event => {
    this.setState({
      id: event.target.value,
    });
  }

  onAddToCartHandler() {
    let variant = this.props.variants.find(variant => variant.id === this.state.id);
    if (!variant)
      variant = this.props.product;
    this.props.addProductToCart(variant.id, variant.name, variant.image, variant.variant.options_text, variant.variant.promotion_price, parseInt(this.state.qty, 10), this.props.product.id);
    this.props.changeStock(variant.id, parseInt(this.state.qty, 10));
  };

  render(){
    const { classes, product, variants } = this.props;

    let variantNames = [];
    variants.map(variant =>
      variantNames.push({label: variant.variant.options_text, value: variant.id})
    );

    let variantHtml;
    if (variants.length === 0)
      variantHtml = <div id="variants"></div>;
    else
      variantHtml = <div style={{width: '100%'}}>
                      <VariantSelector variantNames={variantNames} onVariantClickHandler={this.onVariantClickHandler} variant={this.state.id}/>
                    </div>;

    let currentVar = variants.find( variant => {
      return variant.id === this.state.id;
    });
    if (!currentVar)
      currentVar = product;
    let displayPrice;
    if(currentVar.variant.price === currentVar.variant.promotion_price){
      displayPrice = <div><strong> $ {currentVar.variant.price}</strong></div>;
    }
    else{
      displayPrice = <div><strike>$ {currentVar.variant.price}</strike><strong> $ {currentVar.variant.promotion_price}</strong></div>;
    }


    if (product.variant.is_master)
      return (
        <MuiThemeProvider theme={theme}>
          <Header product={product} price={displayPrice}/>
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
                  <QuantitySelector onQuantityClickHandler={this.onQuantityClickHandler} qty={this.state.qty}/>
                </div>
                <div style={{width: '100%'}}>
                  <Button raised className={classes.button} onClick={this.onAddToCartHandler}>
                    Agregar al Carro
                  </Button>
                </div>
                <div style={{width: '100%'}}>
                  <Paper className={classes.description} elevation={4}>
                    <Typography component="p">
                      {product.description}
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
  changeStock: PropTypes.func,
  classes: PropTypes.object.isRequired,
  products: PropTypes.array
};

const mapStateToProps = (state, props) => {
  return {
    product: productSelector(state, props.match.params.id),
    variants: variantsProductsSelector(state, props.match.params.id),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (id, name, price, imgUrl, variants, categories) => dispatch(addProduct(id, name, price, imgUrl, variants, categories)),
    addProductToCart: (local_id, name, img, variant, price, quantity, product_id) => dispatch(addProductToCart(local_id, name, img, variant, price, quantity, product_id)),
    changeStock: (local_id, quantity) => dispatch(changeStock(local_id, quantity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductView));
