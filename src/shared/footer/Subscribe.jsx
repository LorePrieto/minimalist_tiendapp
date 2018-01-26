import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { grey } from 'material-ui/colors';
import SendIcon from 'material-ui-icons/Send';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    width: '50%',
  },
  button: {
    boxShadow: 'none',
    paddingTop: 3,
    paddingBottom: 3,
    border: '1px solid',
    borderColor: 'rgba(0,0,0,0.27)',
    minWidth: 0,
    minHeight: 0,
  },
  icon: {
    color: 'rgba(0,0,0,0.27)',
  },
});

const theme = createMuiTheme({
  palette: {
    primary: grey,
  }
});

class Subscribe extends React.Component {
  state = {
    email: '',
  };

  handleChange = email => event => {
    this.setState({
      [email]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
        />
        <Button raised className={classes.button}>
          <SendIcon className={classes.icon}/>
        </Button>
      </MuiThemeProvider>
    );
  }
}

Subscribe.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Subscribe);
