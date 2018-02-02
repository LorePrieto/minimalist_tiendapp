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

class Recover extends React.Component {
  handleButtonClick = (event) => {
    const { email, RecoverClose } = this.props;
    RecoverClose();
    fetch('http://tutienda.lvh.me:4000/user/spree_user/password.json', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        spree_user: {
          email: email,
        }
      }),
    }).then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    );
    alert("Recibirás un correo a la brevedad para cambiar la contraseña.");
  };

  render() {
    const { open, email, classes, handleChange, handleRecoverClose, handleClickLogin, handleClickNew } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleRecoverClose()}
          disableAutoFocus
        >
          <div className={classes.modalContent}>
            <IconButton onClick={handleRecoverClose()} className={classes.closeButton}>
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
            <Button raised className={classes.button} onClick={this.handleButtonClick}>
              Recuperar contraseña
            </Button>
            <Button className={classes.buttonPassword} onClick={handleClickLogin}>
              Ingresar a la cuenta
            </Button>
            <Button className={classes.buttonPassword} onClick={handleClickNew}>
              Crear una cuenta
            </Button>
          </div>
        </Modal>
      </MuiThemeProvider>
    );
  }
};

Recover.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  email: PropTypes.string,
  loggedIn: PropTypes.bool,
  handleChange: PropTypes.func,
  handleRecoverClose: PropTypes.func,
  handleClickLogin: PropTypes.func,
  handleClickNew: PropTypes.func,
  RecoverClose: PropTypes.func
};



export default withStyles(styles)(Recover);
