import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon } from 'material-ui/List';
import ShoppingCartIcon from 'material-ui-icons/ShoppingCart';
import HomeIcon from 'material-ui-icons/Home';
import LoyaltyIcon from 'material-ui-icons/Loyalty';
import Typography from 'material-ui/Typography';

export const logoListItems = (
  <div>
    <img src={"/images/logo_450x.png"} alt="logo" style={{width: '90%', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '15px'}}/>
  </div>
);

export const cartListItems = (
  <div>
    <br/>
    <Link to="/cart">
      <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
          <Typography type="caption" gutterBottom align="center">
            Cart
          </Typography>
      </ListItem>
    </Link>
    <br/>
  </div>
);

export const OtherListItems = (
  <div>
    <br/>
    <Link to="/">
    <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
        <Typography type="caption" gutterBottom align="center">
          Home
        </Typography>
    </ListItem>
  </Link>
  <Link to="/catalog">
    <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
      <ListItemIcon>
        <LoyaltyIcon />
      </ListItemIcon>
        <Typography type="caption" gutterBottom align="center">
          Catalog
        </Typography>
    </ListItem>
  </Link>
    <br/>
  </div>
);
