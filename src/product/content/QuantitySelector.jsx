import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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


class QuantitySelector extends React.Component {
  render() {
    const { classes, qty, onQuantityClickHandler, disabled } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="number"
          label="Quantity"
          value={qty}
          disabled={disabled === 'true'}
          onChange={onQuantityClickHandler()}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
      </form>
    );
  }
}

QuantitySelector.propTypes = {
  classes: PropTypes.object.isRequired,
  qty: PropTypes.string,
  onQuantityClickHandler: PropTypes.func,
  disabled: PropTypes.string,
};

export default withStyles(styles)(QuantitySelector);
