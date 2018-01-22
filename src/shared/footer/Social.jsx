import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Facebook from './Facebook.jsx'
import Twitter from './Twitter.jsx'
import Instagram from './Instagram.jsx'
import Pinterest from './Pinterest.jsx'

const styles = theme => ({
  paper: {
    padding: 16,
    boxShadow: 'none',
  },
  typography: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 18,
    width: 22,
    height: 22,
  },
});


function Social(props) {
  const { classes } = props;

  return (
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <Typography type="headline" component="h3" className={classes.typography}>
            Síguenos
          </Typography>
          <div className={classes.controls}>
            <IconButton
              aria-label="github"
              component="a"
              href={`https://github.com/hello`}
              className={classes.icon}
            >
              <Facebook />
            </IconButton>
            <IconButton
              aria-label="github"
              component="a"
              href={`https://github.com/hello`}
              className={classes.icon}
            >
              <Twitter />
            </IconButton>
            <IconButton
              aria-label="github"
              component="a"
              href={`https://github.com/hello`}
              className={classes.icon}
            >
              <Instagram />
            </IconButton>
            <IconButton
              aria-label="github"
              component="a"
              href={`https://github.com/hello`}
              className={classes.icon}
            >
              <Pinterest />
            </IconButton>
          </div>
        </Paper>
      </Grid>
  );
}

Social.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Social);
