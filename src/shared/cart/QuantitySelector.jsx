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
    width: '100%',
  },
});


class QuantitySelector extends React.Component {
  state = {
    qty: '1',
  };

  handleChange = name => event => {
    if (event.target.value > 0) {
      this.setState({
          [name]: event.target.value,
      });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="number"
          label="Qty"
          value={this.state.qty}
          onChange={this.handleChange('qty')}
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
};

export default withStyles(styles)(QuantitySelector);
