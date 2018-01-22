import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Card, { CardMedia } from 'material-ui/Card';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { grey } from 'material-ui/colors';
import Button from 'material-ui/Button';
import VariantSelector from './VariantSelector.jsx';
import Typography from 'material-ui/Typography';
import QuantitySelector from './QuantitySelector.jsx'

/** Redux */
import {connect} from 'react-redux';
import {addProductToCart} from '../../actions/cart';
import {productsSelector} from '../../selectors/products';


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
  },
  media: {
    height: 400,
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
  }
  render(){
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={5}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image='/images/te1.png'
                  title="Golden Monkey"
                />
              </Card>
            </Grid>
            <Grid item xs={12} sm={7}>
              <div style={{width: '100%'}}>
                <VariantSelector/>
              </div>
              <div style={{width: '100%'}}>
                <QuantitySelector onQuantityClickHanlder={this.onQuantityClickHanlder} value={this.state.qty} />
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
  }
}

ProductView.propTypes = {
  classes: PropTypes.object.isRequired
};

// ProductView.contextTypes = {
//   store: React.PropTypes.object
// };

/* TODO: Redux mapping functions */
/** Map the state to the props of a component associated to the store's data */
const mapStateToProps = (state) => {
  return {
    products: productsSelector(state)
  };
}
/** Maps the dispactch methos of the store to the callback props of a components's handler of some event.
 * Meaning: which callback call dispatches which action
 */
const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (product_id, variant_id, quantity) => dispatch(addProductToCart(product_id, variant_id, quantity))
  }
}

/** Connect Method */
const productView = connect();

export default withStyles(styles)(ProductView);
