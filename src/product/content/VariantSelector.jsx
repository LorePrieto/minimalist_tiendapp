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

  render() {
    const { classes, variantNames, variant, onVariantClickHandler } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="select-variant"
          select
          label="Opción"
          className={classes.textField}
          value={variant}
          onChange={onVariantClickHandler()}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {variantNames.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
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
