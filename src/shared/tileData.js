import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import LoyaltyIcon from 'material-ui-icons/Loyalty';
import ToysIcon from 'material-ui-icons/Toys';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import Typography from 'material-ui/Typography';

export const logoListItems = (
  <div>
    <img src={"/images/logo.png"} alt="logo" style={{width: '90%', display: 'block', marginLeft: 'auto', marginRight: 'auto',}}/>
  </div>
);

export const OtherListItems = (
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
