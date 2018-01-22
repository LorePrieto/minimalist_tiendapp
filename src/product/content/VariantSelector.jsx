import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  textField: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '90%',
  },
});

class VariantSelector extends React.Component {
  state = {
    variant: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, variants } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="select-variant"
          select
          label="Opción"
          className={classes.textField}
          value={this.state.variant}
          onChange={this.handleChange('variant')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {variants.map(option => (
            <MenuItem key={option.variant} value={option.variant}>
              {option.variant}
            </MenuItem>
          ))}
        </TextField>
      </form>
    );
  }
}

VariantSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VariantSelector);
