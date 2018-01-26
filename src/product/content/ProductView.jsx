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
import Snackbar from "material-ui/Snackbar";

// Redux
import {connect} from 'react-redux';
import {changeStock} from '../../actions/products';
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
    width: '100%',
    boxShadow: 'none',
  }),
  descriptionText: {
    textAlign: 'justify',
    color: 'rgba(0,0,0,0.54)',
    fontSize: '1em',
  },
  stockText:{
    color: 'rgba(0,0,0,0.54)',
    fontSize: '0.7em',
  },
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
      id: this.props.variants.length > 0 ? this.props.variants[0].id : this.props.match.params.variant_id,
    };
    this.onQuantityClickHandler =  this.onQuantityClickHandler.bind(this);
    this.onAddToCartHandler =  this.onAddToCartHandler.bind(this);
    this.onVariantClickHandler =  this.onVariantClickHandler.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      id: this.props.variants.length > 0 ? this.props.variants[0].id : this.props.match.params.variant_id,
    });
  }

  onQuantityClickHandler = () => event => {
    let variant = this.props.variants.find(variant => variant.id === this.state.id);
    if (!variant)
      variant = this.props.product;
    if ((variant.total_on_hand >= event.target.value || variant.is_backorderable) && (event.target.value > 0 || event.target.value === '')){
      this.setState({
          qty: event.target.value,
      });
    }else if (!(variant.total_on_hand >= event.target.value || variant.is_backorderable)) {
      this.setState({
        openSnack: true,
      })
    }
  }

  onVariantClickHandler = () => event => {
    this.setState({
      id: event.target.value,
      qty: '1',
    });
  }

  onAddToCartHandler() {
    if (this.state.qty > 0){
      let variant = this.props.variants.find(variant => variant.id === this.state.id);
      if (!variant)
        variant = this.props.product;
      this.props.addProductToCart(variant.variant_id, variant.name, variant.image, variant.options_text, variant.promotion_price, parseInt(this.state.qty, 10), this.props.product.variant_id);
      this.props.changeStock(variant.variant_id, parseInt(this.state.qty, 10));
      this.setState({
          qty: '0',
      });
    }
  };

  handleSnackBarClose = (ev, reason) => {
    if (reason !== 'clickaway')
      this.setState({ openSnack: false });
  };

  render(){
    const { classes, product, variants } = this.props;

    if (product) {
      if ((product.has_variants && variants.length > 0) || !product.has_variants){
        let variantNames = [];
        variants.map(variant =>
          variantNames.push({label: variant.options_text, value: variant.id})
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
        if(currentVar.price === currentVar.promotion_price){
          displayPrice = <div><strong> $ {currentVar.price}</strong></div>;
        }else{
          displayPrice = <div><strike>$ {currentVar.price}</strike><strong> $ {currentVar.promotion_price}</strong></div>;
        }
        let disable;
        if (currentVar.total_on_hand > 0 || currentVar.is_backorderable){
          disable = 'false';
        }else{
          disable = 'true';
        }
        let addCartText;
        if (disable === 'true')
          addCartText = 'Sin Stock';
        else
          addCartText = 'Agregar al Carro';
        let stockText;
        if( currentVar.is_backorderable ){
          if (currentVar.total_on_hand <= 0)
            stockText = 'No quedan unidades en stock pero puedes comprar y te los mandaremos cuando estén listos.';
          else
            stockText = 'Quedan ' +currentVar.total_on_hand+' en stock pero puedes comprar más y te los mandaremos cuando estén listos.';
        } else {
          stockText = 'Quedan ' +currentVar.total_on_hand+' en stock.';
        }
        if (product.is_master)
          return (
            <MuiThemeProvider theme={theme}>
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
                    <Header product={product} price={displayPrice}/>
                    {variantHtml}
                    <div style={{width: '100%'}}>
                      <QuantitySelector
                        onQuantityClickHandler={this.onQuantityClickHandler}
                        qty={this.state.qty}
                        disabled={disable}
                      />
                    </div>
                    <div>
                      <Typography className={classes.stockText}>
                        {stockText}
                      </Typography>
                      <br/>
                    </div>
                    <div style={{width: '100%'}}>
                      <Button raised disabled={disable === 'true'} className={classes.button} onClick={this.onAddToCartHandler}>
                        {addCartText}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
                <div style={{width: '90%', display: 'flex', margin: '0 auto'}}>
                  <Paper className={classes.description} elevation={4}>
                    <Typography component="p" className={classes.descriptionText}>
                      {product.description}
                    </Typography>
                  </Paper>
                </div>
              </div>
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                open={this.state.openSnack}
                onClose={this.handleSnackBarClose}
                autoHideDuration={1000}
                SnackbarContentProps={{
                  "aria-describedby": "message-id"
                }}
                message={<span id="message-id">No hay más stock</span>}
              />
            </MuiThemeProvider>
          );
        else{
          return (<Redirect to="/nomatch"/>);
        }
      }else{
        return null;
      }
    }else{
      return null
    }
  }
}

ProductView.propTypes = {
  addProductToCart: PropTypes.func,
  changeStock: PropTypes.func,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object,
  variants: PropTypes.array
};

const mapStateToProps = (state, props) => {
  return {
    product: productSelector(state, props.match.params.variant_id),
    variants: variantsProductsSelector(state, props.match.params.variant_id),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (variant_id, name, img, variant, price, quantity, product_id) => dispatch(addProductToCart(variant_id, name, img, variant, price, quantity, product_id)),
    changeStock: (variant_id, quantity) => dispatch(changeStock(variant_id, quantity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProductView));
