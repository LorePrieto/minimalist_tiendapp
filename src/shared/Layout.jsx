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
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import CloseIcon from 'material-ui-icons/Close';
import ProductsListItems from './cart/cartData.jsx';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Login from './Login';
import Recover from './Recover';
import New from './New';

// Redux
import {connect} from 'react-redux';
import { updateAllCart } from '../actions/initial.js';
import { guestUser } from '../actions/user.js';
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
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      right: false,
      notice: false,
      openModal: false,
      openRecover: false,
      openNew: false,
      email: '',
      password: '',
      confirmation: ''
    };
    this.onLinkClick =  this.onLinkClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickRecover = this.handleClickRecover.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickNew = this.handleClickNew.bind(this);
    this.handleRecoverClose = this.handleRecoverClose.bind(this);
    this.RecoverClose = this.RecoverClose.bind(this);
    this.handleNewClose = this.handleNewClose.bind(this);
    this.NewClose = this.NewClose.bind(this);
  }

  componentDidMount = () => {
    if (this.props.user){
      if (this.props.user.email !== ''){
        this.props.updateAllCart(this.props.user.token);
      }
    }else{
      this.props.guestUser();
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleModalOpen = () => {
    this.setState({
      openModal: true
    });
  };

  handleModalClose = () => event => {
   this.setState({
     openModal: false,
     password: '',
     email: '',
     confirmation: ''
   });
  };

  handleNewClose = () => event => {
   this.setState({
     openNew: false,
     password: '',
     email: '',
     confirmation: ''
   });
  };

  RecoverClose = () => {
    this.setState({
     openRecover: false,
     email: '',
     password: '',
     confirmation: ''
    });
  }

  NewClose = () => {
    this.setState({
     openNew: false,
     email: '',
     password: '',
     confirmation: ''
    });
  }

  handleRecoverClose = () => event => {
    this.setState({
     openRecover: false,
     email: '',
     password: '',
     confirmation: ''
    });
  };

  handleClickRecover = () => {
    this.setState({
      openModal: false,
      openNew: false,
      openRecover:true,
      password: '',
      confirmation: ''
    });
  };

  handleClickLogin = () => {
    this.setState({
      openModal: true,
      openNew: false,
      openRecover:false,
      password: '',
      confirmation: ''
    });
  };

  handleClickNew = () => {
    this.setState({
      openModal: false,
      openNew: true,
      openRecover:false,
      password: '',
      confirmation: '',
    });
  };

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value
    });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  onLinkClick = () => event => {
    this.setState({
      right: false
    });
  };

  render() {
    const { classes, children, cart } = this.props;

    let carro;
    if (cart.length > 0)
      carro = 'Carro ('+cart.length+')'
    else
      carro  = 'Carro'

    let loggedIn;
    if (this.props.user)
      loggedIn = this.props.user.email !== '' ? true : false;
    else
      loggedIn = false;

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
      <Login
        open={this.state.openModal}
        email={this.state.email}
        password={this.state.password}
        handleChange={this.handleChange}
        loggedIn={loggedIn}
        handleModalClose={this.handleModalClose}
        handleModalOpen={this.handleModalOpen}
        handleClickRecover={this.handleClickRecover}
        handleClickNew={this.handleClickNew}
      />
    <Recover
        open={this.state.openRecover}
        email={this.state.email}
        handleChange={this.handleChange}
        handleRecoverClose={this.handleRecoverClose}
        handleClickLogin={this.handleClickLogin}
        handleClickNew={this.handleClickNew}
        RecoverClose={this.RecoverClose}
      />
    <New
        open={this.state.openNew}
        email={this.state.email}
        password={this.state.password}
        confirmation={this.state.confirmation}
        handleChange={this.handleChange}
        handleClickLogin={this.handleClickLogin}
        handleClickRecover={this.handleClickRecover}
        handleNewClose={this.handleNewClose}
        NewClose={this.NewClose}
      />
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
                <ProductsListItems onLinkClick={this.onLinkClick}/>
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
  subtotal: PropTypes.number,
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
  updateAllInfo: PropTypes.func,
  guestUser: PropTypes.func,
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
    updateAllCart: (token) => dispatch(updateAllCart(token)),
    guestUser: () => dispatch(guestUser())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles,{withTheme:true})(Layout));
