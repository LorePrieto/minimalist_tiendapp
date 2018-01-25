import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    marginTop: 'none',
  },
});

class Data extends React.Component {
  render () {

    return (
      <p>Hello</p>
    );
  }
}

export default withStyles(styles)(Data);
