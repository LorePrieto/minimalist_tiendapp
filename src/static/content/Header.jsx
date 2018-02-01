import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    width: '100%',
    boxShadow: 'none',
  },
  media: {
    height: 250,
  },
  title: {
    textAlign: 'center',
    color: 'rgba(0,0,0,0.54)',
  },
};

function Header(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} type="headline" component="h2">
            Página Estática
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image="https://static.pexels.com/photos/257360/pexels-photo-257360.jpeg"
          title="Contemplative Reptile"
        />
      </Card>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
