import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import QuantitySelector from './QuantitySelector.jsx';

// Redux
import { connect } from 'react-redux';
import { changeItemQuantity } from '../../actions/cart';


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



class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: this.props.cartItem.quantity,
    };
    this.onQuantityClickHandler =  this.onQuantityClickHandler.bind(this);
  }

  onQuantityClickHandler = () => event => {
    if (event.target.value > 0){
      this.setState({
        qty: event.target.value,
      });
      this.props.changeItemQuantity(this.props.cartItem.local_id, this.props.cartItem.price, parseInt(event.target.value,10), this.props.cartItem.product_id);
    }
  }

  render() {
    const { classes, cartItem } = this.props;

    return (
      <div key={cartItem.local_id + '-div'}style={{width: '100%'}}>
        <Grid item key={cartItem.local_id} xs={12} className={classes.product}>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={8} >
              <a href={'/product/'+cartItem.product_id} style={{textDecoration: 'none'}}>
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
              </a>
            </Grid>
            <Grid item xs={3} style={{displayFelx:"column"}}>
              <br/>
              <Typography type="subheading" color="secondary">{'Total: $ ' + (cartItem.quantity*cartItem.price)}</Typography>
              <br/>
              <QuantitySelector onQuantityClickHandler={this.onQuantityClickHandler} qty={this.state.qty}/>
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
    );
  };
}

CartItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  changeItemQuantity: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeItemQuantity: (local_id, price, quantity) => dispatch(changeItemQuantity(local_id, price, quantity))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{withTheme:true})(CartItem));
