import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import AccountBoxIcon from 'material-ui-icons/AccountBox';
import Modal from 'material-ui/Modal';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { grey } from 'material-ui/colors';

// Redux
import {connect} from 'react-redux';
import {loginUser} from '../actions/user';


const styles = theme => ({
  modalContent: {
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: 'none',
    padding: theme.spacing.unit * 4,
    margin: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap',
    transform: `translate(50%, 50%)`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    marginTop: 20,
    paddingTop: 8,
    paddingBottom: 8,
    width: '100%',
    backgroundColor: 'rgba(254, 0, 0, 0.7)',
    color: 'white',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
  }
});

class Login extends React.Component {
  handleModalClick = (event) => {
    event.preventDefault();
    this.props.handleModalOpen()
  };

  handleButtonClick = (event) => {
    const {loginUser, email, password } = this.props;
    //Missing encrypt password
    loginUser(email, "hZBhm6y1Ffu18GqBCCxT5a4exeU6szr8SEtYojwSUY6IN/MtSZ2j5dZDSjVf\nJopLDXm2DYsMLq3kyIuaPkIOzTZL7c0wNx/cYih53nI9GPcLAAE8SShpdAC4\nZ60GSZF80VF3lwRMh5QJt3Tw7FSAp+P/ROBEqgxGk3+hcEYJLWw=");
  };


  render() {
    const { open, email, password, loggedIn, classes, handleChange, handleModalClose } = this.props

    if (loggedIn){
      return (
        <Link to="/account" style={{textDecoration: 'none'}}>
          <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
              <Typography type="caption" gutterBottom align="center">
                Mi Cuenta
              </Typography>
          </ListItem>
        </Link>
      );
    } else{
      return (
        <MuiThemeProvider theme={theme}>
          <a to='#' onClick={this.handleModalClick}  style={{textDecoration: 'none'}}>
            <ListItem button style={{width: '100%', paddingLeft: '45px'}}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
                <Typography type="caption" gutterBottom align="center">
                  Ingresar
                </Typography>
            </ListItem>
          </a>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleModalClose()}
            disableAutoFocus
          >
            <div className={classes.modalContent}>
              <Typography type="title" id="modal-title">
                Ingresa tus datos
              </Typography>
              <TextField
                id='email'
                label='Email'
                className={classes.textField}
                value={email}
                onChange={handleChange('email')}
                margin='normal'
                />
              <TextField
                id='password'
                label='Password'
                className={classes.textField}
                value={password}
                onChange={handleChange('password')}
                type='password'
                margin='normal'
              />
            <Button raised className={classes.button} onClick={this.handleButtonClick}>
                Ingresar
              </Button>
            </div>
          </Modal>
        </MuiThemeProvider>
      );
    }
  }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  loggedIn: PropTypes.bool,
  handleChange: PropTypes.func,
  handleModalClose: PropTypes.func,
  loginUser: PropTypes.func,
};


const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
