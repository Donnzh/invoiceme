import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Pagination from "components/Pagination";
import TableLoader from "components/TableLoader";

const styles = theme => ({
  paper: {
    width: "100%",
    overflowX: "auto",
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 10,
    overflowX: "auto",
    height: "380px",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
    "&:focus": {
      backgroundColor: theme.palette.grey["300"],
    },
  },
  placeholderRow: {
    height: "100%",
  },
  button: {
    width: 40,
    height: 40,
    margin: "5px 5px 0 5px",
  },
});

const tableHeaderData = [
  {
    value: "id",
    label: "Id",
    align: "inherit",
    isSortable: false,
  },
  {
    value: "name",
    label: "Name",
    align: "left",
    isSortable: true,
  },
  {
    value: "invoiceDate",
    label: "Date",
    align: "left",
    isSortable: true,
  },
  {
    value: "comment",
    label: "Comments",
    align: "right",
    isSortable: false,
  },
  {
    value: "amount",
    label: "Amounts",
    align: "right",
    isSortable: true,
  },
  {
    value: "action",
    label: "Actions",
    align: "right",
    isSortable: false,
  },
];

function InvoiceTable(props) {
  const { classes, tableData, onEditClick, onDeleteClick } = props;
  if (!tableData) {
    return <TableLoader />;
  }

  const [rowPerPage, setRowPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const onPageChanged = pageNumber => {
    setCurrentPage(pageNumber);
  };
  const onRowPerPageChanged = pageNumber => {
    setRowPerPage(pageNumber);
    setCurrentPage(1);
  };

  const onSortHandler = col => {
    sortTableDate(col);
    let order = "desc";
    if (sortCol === col && sortOrder === "desc") {
      order = "asc";
    }
    setSortCol(col);
    setSortOrder(order);
  };

  const renderTableHeader = () => {
    return tableHeaderData.map((data, i) => {
      if (!data.isSortable)
        return (
          <TableCell key={i} align={data.align}>
            {data.label}
          </TableCell>
        );
      else {
        return (
          <TableCell key={i} align={data.align}>
            <TableSortLabel
              active={sortCol === data.value}
              direction={sortOrder}
              onClick={() => onSortHandler(data.value)}
            >
              {data.label}
            </TableSortLabel>
          </TableCell>
        );
      }
    });
  };

  const renderActionButtons = data => (
    <React.Fragment>
      <Tooltip placement="top" title="Edit">
        <IconButton
          onClick={() => onEditClick(data)}
          aria-label="Edit Icon"
          className={styles.button}
        >
          <Icon fontSize="small">edit_icon</Icon>
        </IconButton>
      </Tooltip>
      <Tooltip placement="top" title="Delete">
        <IconButton
          onClick={() => onDeleteClick(data)("delete")}
          aria-label="Delete"
          className={styles.button}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );

  const sortTableDate = col => {
    tableData.sort((a, b) => {
      if (!a.hasOwnProperty(col) || !b.hasOwnProperty(col)) return 0;
      let compareResult;
      if (col === "invoiceDate") {
        compareResult = new Date(a[col]).getTime() - new Date(b[col]).getTime();
      }
      if (col === "amount") {
        compareResult = Number(a[col]) > Number(b[col]) ? 1 : -1;
      } else {
        compareResult = a[col] > b[col] ? 1 : -1;
      }
      return sortOrder === "desc" ? compareResult : compareResult * -1;
    });
  };

  const currentTableData = tableData.slice(
    currentPage * rowPerPage - rowPerPage,
    currentPage * rowPerPage
  );

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Table className={classes.root}>
          <TableHead>
            <TableRow>{renderTableHeader()}</TableRow>
          </TableHead>
          <TableBody>
            {currentTableData.map((data, index) => (
              <TableRow tabIndex={0} className={classes.row} key={index}>
                <TableCell component="th" scope="data">
                  {data.id}
                </TableCell>
                <TableCell align="left">{data.name}</TableCell>
                <TableCell align="left">{data.invoiceDate}</TableCell>
                <TableCell align="right">{data.comment}</TableCell>
                <TableCell align="right">{"$ " + data.amount}</TableCell>
                <TableCell align="right">{renderActionButtons(data)}</TableCell>
              </TableRow>
            ))}
            {currentTableData.length < rowPerPage && (
              <TableRow className={classes.placeholderRow} />
            )}
          </TableBody>
        </Table>
      </Paper>
      <Pagination
        totalRecords={tableData.length}
        rowPerPage={rowPerPage}
        onPageChanged={onPageChanged}
        onRowPerPageChanged={onRowPerPageChanged}
        currentPage={currentPage}
      />
    </React.Fragment>
  );
}

InvoiceTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableData: PropTypes.array,
  onEditClick: PropTypes.func,
};

export default withStyles(styles)(InvoiceTable);
