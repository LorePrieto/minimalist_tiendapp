import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { grey } from 'material-ui/colors';
import NodeRSA from 'node-rsa';

// Redux
import {connect} from 'react-redux';
import {loginUser} from '../actions/user';
import {tiendappSelector} from '../selectors/tiendapp';


const styles = theme => ({
  modalContent: {
    backgroundColor: 'white',
    boxShadow: 'none',
    padding: theme.spacing.unit * 4,
    margin: theme.spacing.unit,
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      backgroundColor: 'white',
      boxShadow: 'none',
      padding: theme.spacing.unit * 4,
      margin: theme.spacing.unit,
      display: 'flex',
      flexWrap: 'wrap',
      transform: `translate(40%, 40%)`,
      width: '60%'
    },
  },
  closeButton: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    color: 'rgba(0,0,0,0.54)',
    display: 'flex',
    marginTop: 10,
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
  buttonPassword: {
    marginTop: theme.spacing.unit,
    color: 'rgba(0,0,0,0.54)',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
  }
});

class Login extends React.Component {
  encryptPassword = (password) => {
    var key = new NodeRSA(this.props.tiendapp.public_key, {encryptionScheme: 'pkcs1'});
    return key.encrypt(password, 'base64');
  };

  handleButtonClick = (event) => {
    const {loginUser, email, password, confirmation, NewClose } = this.props;
    NewClose();
    fetch('http://tutienda.lvh.me:4000/api/users', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        user: {
          email: email,
          password: this.encryptPassword(password),
          password_confirmation: this.encryptPassword(confirmation)
        }
      }),
    }).then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    );
    loginUser(email, this.encryptPassword(password));
    alert("Tu cuenta a sido creada.");
  };

  render() {
    const {
      open,
      email,
      password,
      confirmation,
      classes,
      handleChange,
      handleClickRecover,
      handleClickLogin,
      handleNewClose,
    } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleNewClose()}
          disableAutoFocus
        >
          <div className={classes.modalContent}>
            <IconButton onClick={handleNewClose()} className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
            <Typography type="title" id="modal-title" className={classes.title}>
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
            <TextField
              id='confirmation'
              label='Confirmation'
              className={classes.textField}
              value={confirmation}
              onChange={handleChange('confirmation')}
              type='password'
              margin='normal'
            />
            <Button raised className={classes.button} onClick={this.handleButtonClick}>
              Ingresar
            </Button>
            <Button className={classes.buttonPassword} onClick={handleClickLogin}>
              Ingresar a tu cuenta
            </Button>
            <Button className={classes.buttonPassword} onClick={handleClickRecover}>
              Recuperar contraseña
            </Button>
          </div>
        </Modal>
      </MuiThemeProvider>
    );
  }
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmation: PropTypes.string,
  loggedIn: PropTypes.bool,
  handleChange: PropTypes.func,
  handleNewClose: PropTypes.func,
  loginUser: PropTypes.func,
  tiendapp: PropTypes.object,
};


const mapStateToProps = (state) => {
  return {
    tiendapp: tiendappSelector(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));
