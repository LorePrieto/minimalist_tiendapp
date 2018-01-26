import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import { ListItem, ListItemIcon } from 'material-ui/List';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { Link } from 'react-router-dom';
import HomeIcon from 'material-ui-icons/Home';
import LoyaltyIcon from 'material-ui-icons/Loyalty';
import ToysIcon from 'material-ui-icons/Toys';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import CloseIcon from 'material-ui-icons/Close';
import ProductsListItems from './cart/cartData.jsx';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

// Redux
import {connect} from 'react-redux';
//import { loginUser } from '../actions/user.js';
import {cartSelector, getSubtotal} from '../selectors/cart.js';
import { userSelector } from '../selectors/user.js';


const drawerWidth = 260;
const drawerWidthCart = 650;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    backgroundColor: 'white',
    boxShadow: 'none',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    borderRight: 'none',
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      overflowY: 'scroll',
    },
  },
  logo: {
    height: '20%',
    padding: 0,
  },
  drawerCart: {
    width: 300,
    borderRight: 'none',
    [theme.breakpoints.up('md')]: {
      width: drawerWidthCart,
      height: '100%',
    },
  },
  drawerHeaderCart: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: 34,
    paddingTop: 80,
    ...theme.mixins.toolbar,
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  notice: {
    color: 'white',
    backgroundColor: 'rgba(254,0,0,0.2)',
    border: 'rgba(254,0,0,0.54) 1px',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 40,
    boxShadow: 'none',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center'
  },
  cartHeader: {
    textAlign: 'center',
    marginTop: '-40px',
    paddingBottom: 30,
    color: 'rgba(0,0,0,0.54)'
  },
  cartSubtotal: {
    textAlign: 'right',
    paddingBottom: 20,
    paddingTop: 20,
    color: 'rgba(0,0,0,0.54)',
    paddingRight: 20,
  },
  button: {
    margin: 20,
    paddingRight: 30,
    paddingLeft: 30,
    position: 'absolute',
    right: 0,
    backgroundColor: 'rgba(254, 0, 0, 0.7)',
    color: 'white',
  },
});

class Layout extends React.Component {
  state = {
    mobileOpen: false,
    right: false,
    notice: false,
  };

  // componentDidMount(){
  //   this.props.loginUser("susu@uc.cl", "hZBhm6y1Ffu18GqBCCxT5a4exeU6szr8SEtYojwSUY6IN/MtSZ2j5dZDSjVf\nJopLDXm2DYsMLq3kyIuaPkIOzTZL7c0wNx/cYih53nI9GPcLAAE8SShpdAC4\nZ60GSZF80VF3lwRMh5QJt3Tw7FSAp+P/ROBEqgxGk3+hcEYJLWw=");
  // };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, children, cart } = this.props;

    let carro;
    if (cart.length > 0)
      carro = 'Carro ('+cart.length+')'
    else
      carro  = 'Carro'

      const OtherListItems = (
        <div>
          <br/>
          <Link to="/" style={{textDecoration: 'none'}}>
          <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
              <Typography type="caption" gutterBottom align="center">
                Inicio
              </Typography>
          </ListItem>
        </Link>
        <Link to="/catalog" style={{textDecoration: 'none'}}>
          <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
            <ListItemIcon>
              <LoyaltyIcon />
            </ListItemIcon>
              <Typography type="caption" gutterBottom align="center">
                Catálogo
              </Typography>
          </ListItem>
        </Link>
        <Link to="/static" style={{textDecoration: 'none'}}>
          <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
            <ListItemIcon>
              <ToysIcon />
            </ListItemIcon>
              <Typography type="caption" gutterBottom align="center">
                Página Estática
              </Typography>
          </ListItem>
        </Link>
        <Link to="/account" style={{textDecoration: 'none'}}>
          <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
              <Typography type="caption" gutterBottom align="center">
                Mi cuenta
              </Typography>
          </ListItem>
        </Link>
          <br/>
        </div>
      );

      const logoListItems = (
        <div>
          <img src={"/images/logo.png"} alt="logo" style={{width: '90%', display: 'block', marginLeft: 'auto', marginRight: 'auto',}}/>
        </div>
      );

    const navbar = (
      <div>
        <div className={classes.drawerHeader} />
        <List className={classes.logo}>{logoListItems}</List>
        <Divider />
          <div>
            <br/>
            <ListItem button onClick={this.toggleDrawer('right', true)} style={{width: '100%', paddingLeft: '45px'}}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <Typography type="caption" gutterBottom align="center">
                {carro}
              </Typography>
            </ListItem>
            <br/>
          </div>
        <Divider />
        <List>{OtherListItems}</List>
      </div>
    );

    let aviso = null;
    if (this.state.notice) {
      aviso =
        <Paper className={classes.notice} elevation={4}>
          <Typography type="headline" component="h3" color="inherit">
            ¡Solo por hoy!
          </Typography>
          <Typography component="p" color="inherit">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              {aviso}
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor='left'
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {navbar}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {navbar}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            {children}
          </main>
          <Drawer anchor="right"
            open={this.state.right}
            onClose={this.toggleDrawer('right', false)}
            classes = {{
              paper: classes.drawerCart
            }}
          >
            <div className={classes.drawerInnerCart}>
              <div className={classes.drawerHeaderCart}>
                <IconButton onClick={this.toggleDrawer('right', false)}>
                  <CloseIcon />
                </IconButton>
              </div>
              <Typography type="headline" component="h3" className={classes.cartHeader}>
                Tu Carrito
              </Typography>
              <Divider style={{margin: 10}} />
              <div style={{width: '100%'}}>
                <ProductsListItems />
              </div>
              <div style={{width: '100%'}}>
                <Typography type="headline" component="h3" className={classes.cartSubtotal}>
                  Subtotal: $ {this.props.subtotal}
                </Typography>
              </div>
              <Divider style={{margin: 10}} />
              <div style={{width: '100%'}}>
                <Button raised className={classes.button}>
                  Comprar
                </Button>
              </div>
            </div>
        </Drawer>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  cart:  PropTypes.array,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    cart: cartSelector(state),
    subtotal: getSubtotal(state),
    user: userSelector(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    //loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{withTheme:true})(Layout));
