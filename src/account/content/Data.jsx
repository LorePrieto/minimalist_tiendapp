import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import LastPageIcon from 'material-ui-icons/LastPage';

// Redux
import {connect} from 'react-redux';
import {ordersSelector} from '../../selectors/orders';

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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: 'rgba(254,0,0,0.54)',
  },
  tableCell: {
    color: 'rgba(0,0,0,0.54)',
  },
  tableLabel: {
    color: 'rgba(0,0,0,0.54)',
    fontSize: '1em',
  },
});

class Data extends React.Component {
  constructor(props){
    super(props);
    this.state  = {
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getSpanishPayment(payment_state){
    switch (payment_state) {
      case 'balance_due':
        return 'Saldo Adeudado';
      case 'paid':
        return 'Pagado'
      case 'credit_owed':
        return 'Crédito Debido';
      case 'failed':
        return 'Fallado';
      case 'pending':
        return 'Pendiente';
      case 'invalid':
        return 'Inválido';
      default:
        return '';
    }
  };

  getSpanishShipment(shipment_state){
    switch (shipment_state) {
      case 'shipped':
        return 'Enviado';
      case 'ready':
        return 'Listo'
      case 'canceled':
        return 'Cancelado';
      case 'pending':
        return 'Pendiente';
      default:
        return '';
    }
  };

  render () {
    const { classes, orders } = this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableBody>
              <TableRow key={"Header"}>
                <TableCell className={classes.tableLabel}>Número de orden</TableCell>
                <TableCell className={classes.tableLabel}>Fecha</TableCell>
                <TableCell className={classes.tableLabel}>Estado</TableCell>
                <TableCell className={classes.tableLabel}>Estado del pago</TableCell>
                <TableCell className={classes.tableLabel}>Estado del Envío</TableCell>
                <TableCell className={classes.tableLabel}>Total</TableCell>
              </TableRow>
              {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(order => {
                return (
                  <TableRow key={order.number}>
                    <TableCell><Link to={"/order/"+order.number} className={classes.link}>{order.number}</Link></TableCell>
                    <TableCell className={classes.tableCell}>{moment(order.completed_at).format("DD-MM-YYYY")}</TableCell>
                    <TableCell className={classes.tableCell}>Completado</TableCell>
                    <TableCell className={classes.tableCell}>{this.getSpanishPayment(order.payment_state)}</TableCell>
                    <TableCell className={classes.tableCell}>{this.getSpanishShipment(order.shipment_state)}</TableCell>
                    <TableCell numeric className={classes.tableCell}>{"$"+parseInt(order.total,10)}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={orders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  rowsPerPageOptions={[5,10,15]}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  Actions={TablePaginationActionsWrapped}
                  labelDisplayedRows={({from, to, count}) => from+" - "+to+" de "+count}
                  labelRowsPerPage={"Productos por página"}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

Data.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.array
};

const mapStateToProps = (state, props) => {
  return {
    orders: ordersSelector(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Data));
