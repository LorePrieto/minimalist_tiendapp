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
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import CloseIcon from 'material-ui-icons/Close';
import { logoListItems, OtherListItems } from './tileData.js';
import ProductsListItems from './cartData.jsx';
import Button from 'material-ui/Button';


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
      height: '100%',
    },
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
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme, children } = this.props;

    const navbar = (
      <div>
        <div className={classes.drawerHeader} />
        <List>{logoListItems}</List>
        <Divider />
          <div>
            <br/>
            <ListItem button onClick={this.toggleDrawer('right', true)} style={{width: '100%', paddingLeft: '45px'}}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <Typography type="caption" gutterBottom align="center">
                Cart (2)
              </Typography>
            </ListItem>
            <br/>
          </div>
        <Divider />
        <List>{OtherListItems}</List>
      </div>
    );

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
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
                Your Cart
              </Typography>
              <Divider style={{margin: 10}} />
              <div style={{width: '100%'}}>
                <ProductsListItems />
              </div>
              <div style={{width: '100%'}}>
                <Typography type="headline" component="h3" className={classes.cartSubtotal}>
                  Subtotal: $ 15.000
                </Typography>
              </div>
              <Divider style={{margin: 10}} />
              <div style={{width: '100%'}}>
                <Button raised className={classes.button}>
                  Check Out
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
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);
