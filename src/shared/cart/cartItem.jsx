import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import QuantitySelector from './QuantitySelector.jsx';
import Snackbar from "material-ui/Snackbar";

// Redux
import { connect } from 'react-redux';
import { changeItemQuantity, removeItemFromCart } from '../../actions/cart';
import { changeStock } from '../../actions/products';
import { productsSelector } from '../../selectors/products';


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
  stockText:{
    color: 'rgba(0,0,0,0.54)',
    fontSize: '0.7em',
    marginTop: 10,
  },
});



class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: this.props.cartItem.quantity,
      openSnack: false
    };
    this.onQuantityClickHandler =  this.onQuantityClickHandler.bind(this);
    this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
  }

  onQuantityClickHandler = () => event => {
    const product = this.props.products.find(product => product.variant_id === this.props.cartItem.variant_id);
    if (((product.total_on_hand + this.props.cartItem.quantity) >= event.target.value || product.is_backorderable) && (event.target.value > 0 || event.target.value === '')){
      this.setState({
        qty: event.target.value,
      });
      if (event.target.value){
        this.props.changeStock(this.props.cartItem.variant_id, (parseInt(event.target.value,10) - this.props.cartItem.quantity));
        this.props.changeItemQuantity(this.props.cartItem.variant_id, this.props.cartItem.price, parseInt(event.target.value,10), this.props.cartItem.product_id);
      }
    }else if (!((product.total_on_hand + this.props.cartItem.quantity) >= event.target.value || product.is_backorderable)) {
      this.setState({
        openSnack: true,
      })
    }
  }

  onDeleteClickHandler = () => event => {
    this.props.changeStock(this.props.cartItem.variant_id, -1*this.props.cartItem.quantity);
    this.props.removeItemFromCart(this.props.cartItem.variant_id, this.props.cartItem.price);
  }

  handleSnackBarClose = (ev, reason) => {
    if (reason !== 'clickaway')
      this.setState({ openSnack: false });
  };

  render() {
    const { classes, cartItem } = this.props;
    const product = this.props.products.find(product => product.variant_id === this.props.cartItem.variant_id);

    let stockText;
    if(product.total_on_hand < 0)
      stockText = 'Algunos de estos productos no se encuentran en stock. Serán enviados apenas estén listos'
    else
      stockText = 'Todos los productos están disponibles y serán enviados a la brevedad.'

    return (
      <div key={cartItem.variant_id + '-div'}style={{width: '100%'}}>
        <Grid item key={cartItem.variant_id} xs={12} className={classes.product}>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={8} >
              <Link to={'/product/'+cartItem.product_id} style={{textDecoration: 'none'}}>
                <Card className={classes.card}>
                  <div className={classes.details}>
                    <CardMedia
                      className={classes.cover}
                      image={cartItem.img}
                      title={cartItem.name + ' ' + cartItem.variant}
                    />
                    <CardContent className={classes.content}>
                      <Typography type="headline" color="secondary" >{cartItem.name}</Typography>
                      <Typography type="subheading" color="secondary">
                        {cartItem.variant}
                      </Typography>
                      <br/>
                      <Typography type="body2" color="secondary">{'Price: $ ' + cartItem.price}</Typography>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </Grid>
            <Grid item xs={3} style={{displayFelx:"column"}}>
              <br/>
              <Typography type="subheading" color="secondary">{'Total: $ ' + (cartItem.quantity*cartItem.price)}</Typography>
              <br/>
              <QuantitySelector onQuantityClickHandler={this.onQuantityClickHandler} qty={this.state.qty}/>
            </Grid>
            <Grid item xs={1}>
              <IconButton className={classes.delete} onClick={this.onDeleteClickHandler()}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <div style={{paddingLeft: 30, display: 'flex'}}>
            <Typography className={classes.stockText}>
              {stockText}
            </Typography>
            <br/>
          </div>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.openSnack}
          onClose={this.handleSnackBarClose}
          autoHideDuration={1000}
          SnackbarContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">No hay más stock</span>}
        />
        <Divider style={{margin: 10}} />
      </div>
    );
  };
}

CartItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  changeItemQuantity: PropTypes.func,
  removeItemFromCart: PropTypes.func,
  changeStock: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  return {
    products: productsSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeItemQuantity: (variant_id, price, quantity) => dispatch(changeItemQuantity(variant_id, price, quantity)),
    removeItemFromCart: (variant_id, price) => dispatch(removeItemFromCart(variant_id, price)),
    changeStock: (variant_id, quantity) => dispatch(changeStock(variant_id, quantity)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{withTheme:true})(CartItem));
