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
    const { classes, qty, onQuantityClickHandler } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="number"
          label="Quantity"
          value={qty}
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
  qty: PropTypes.number,
  onQuantityClickHandler: PropTypes.func,
};

export default withStyles(styles)(QuantitySelector);
