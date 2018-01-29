import React from 'react';
import  SimpleMediaCard  from './SimpleMediaCard.jsx';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IntegrationAutosuggest from './IntegrationAutosuggest.jsx';
import Table, {TableBody, TableFooter, TableRow, TablePagination} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import LastPageIcon from 'material-ui-icons/LastPage';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

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
  table: {

  },
});

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      page: 0,
      rowsPerPage: 6,
    };
    this.onChangeProduct =  this.onChangeProduct.bind(this);
    this.emptyQuery = this.emptyQuery.bind(this);
  }

  handleChangePage = (event, page) => {
    this.setState({
      page
    });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value
    });
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
    const { page, rowsPerPage } = this.state;


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
        <Table className={classes.table}>
          <TableBody>
            <Grid container spacing={40} className={classes.grid}>
              {filteredProducts.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map(product => (
                <Grid item key={product.name+product.id} xs={12} md={4}>
                  <Link to={'/product/'+product.variant_id} style={{textDecoration: 'none'}}>
                    <SimpleMediaCard data= {product} key={product.id} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={filteredProducts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                Actions={TablePaginationActionsWrapped}
                rowsPerPageOptions={[3,6,9]}
                labelDisplayedRows={({from, to, count}) => from+" - "+to+" de "+count}
                labelRowsPerPage={"Productos por página"}
              >
              </TablePagination>
            </TableRow>
          </TableFooter>
        </Table>
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
