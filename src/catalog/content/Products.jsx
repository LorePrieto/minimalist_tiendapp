import React from 'react';
import  SimpleMediaCard  from './SimpleMediaCard.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IntegrationAutosuggest from './IntegrationAutosuggest.jsx';

// Redux
import {connect} from 'react-redux';
import {addProduct} from '../../actions/products';
import {masterProductsSelector} from '../../selectors/products';

const styles = theme => ({
  root: {
    marginTop: 'none',
  },
  header: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3,
    boxShadow: 'none',
    textAlign: 'center',
  }),
  typography: {
    color: 'rgba(0,0,0,0.54)'
  },
});

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.onChangeProduct =  this.onChangeProduct.bind(this);
    this.emptyQuery = this.emptyQuery.bind(this);
  }

  onChangeProduct = newQuery => event => {
    this.setState({
      query: newQuery
    });
  };

  emptyQuery = () => {
    this.setState({
      query: ''
    });
  }

  render () {
    const { classes, products } = this.props;

    let filteredProducts;
    if (this.state.query === ''){
      filteredProducts = products;
    }else {
      filteredProducts = products.filter(product => {
        return product.name === this.state.query
      });
      if (filteredProducts.length === 0) {
        filteredProducts = products.filter(product => product.taxon_names.some(taxon => taxon === this.state.query));
      }
    }

    return (
      <div>
        <Paper className={classes.header} elevation={4}>
          <Typography type="headline" component="h3" className={classes.typography}>
            Catálogo
          </Typography>
          <div>
            <IntegrationAutosuggest onChangeProduct={this.onChangeProduct} emptyQuery={this.emptyQuery} />
          </div>
        </Paper>
        <Grid container spacing={40} className={classes.grid}>
          {filteredProducts.map(product => (
            <Grid item key={product.name+product.id} xs={12} md={4}>
              <Link to={'/product/'+product.variant_id} style={{textDecoration: 'none'}}>
                <SimpleMediaCard data= {product} key={product.id} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Products.propTypes = {
  addProduct: PropTypes.func,
  classes: PropTypes.object.isRequired,
  products: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    products: masterProductsSelector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (id, name, price, imgUrl) => dispatch(addProduct(id, name, price, imgUrl))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Products));
