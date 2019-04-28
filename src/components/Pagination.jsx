import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import InputLabel from "@material-ui/core/InputLabel";
import _range from "lodash/range";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  selectInput: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  pagination: {
    display: "inline",
  },
  inputLabel: {
    fontSize: "14px",
    marginRight: "10px",
  },
  activePageItem: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    border: "none",
    fontSize: "16px",
    margin: 4,
  },
  pageItem: {
    display: "inline",
    border: "none",
    fontSize: "16px",
    backgroundColor: "transparent",
    margin: 4,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  grow: {
    flexGrow: 1,
  },
});

const sortedPageNumber = (totalPages, currentPage) => {
  const maxPageItemBlocks = 7;
  if (totalPages <= maxPageItemBlocks) {
    return _range(1, totalPages + 1);
  } else {
    const leftBound = currentPage > 4 ? currentPage - 1 : 2; // [1, "<", leftBound, currentPage, rightBound, ">", lastPage]
    const rightBound = currentPage < totalPages - 3 ? currentPage + 1 : totalPages - 1;

    const isLeftSpill = leftBound > 2;
    const isRightSpill = rightBound < totalPages - 1;

    if (isLeftSpill && isRightSpill) {
      return [1, "previous", ..._range(leftBound, rightBound + 1), "next", totalPages]; // e.g: [1, "<", 5, 6, 7, ">", 10]
    }
    if (isLeftSpill && !isRightSpill) {
      return [1, "previous", ..._range(rightBound - 3, rightBound + 1), totalPages]; // e.g: [1, "<", 6, 7, 8, 9, 10]
    }
    if (!isLeftSpill && isRightSpill) {
      return [1, ..._range(leftBound, maxPageItemBlocks - 1), "next", totalPages]; // e.g: [1, 2, 3, 4, 5, ">", 10]
    }
  }
};

function Pagination(props) {
  const { classes, currentPage } = props;
  const totalPages = Math.ceil(props.totalRecords / props.rowPerPage);
  const pages = sortedPageNumber(totalPages, currentPage);

  const handleRowPerPageChange = e => {
    props.onRowPerPageChanged(e.target.value);
  };
  return (
    <Toolbar aria-label="Pagination" className={classes.root}>
      <div className={classes.grow} />
      <div className={classes.selectInput}>
        <InputLabel className={classes.inputLabel} htmlFor="age-simple">
          Invoices per page
        </InputLabel>
        <select onChange={handleRowPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>
      <ul className={classes.pagination}>
        {pages.map((page, index) => {
          if (page === "previous")
            return (
              <button
                onClick={() => props.onPageChanged(currentPage - 3)}
                key={index}
                className={currentPage === page ? classes.activePageItem : classes.pageItem}
              >
                &laquo;
                <Typography variant="srOnly">Previous Page</Typography>
              </button>
            );

          if (page === "next")
            return (
              <button
                key={index}
                className={currentPage === page ? classes.activePageItem : classes.pageItem}
                onClick={() => props.onPageChanged(currentPage + 3)}
              >
                &raquo;
                <Typography variant="srOnly">Next Page</Typography>
              </button>
            );

          return (
            <button
              key={index}
              onClick={() => props.onPageChanged(page)}
              className={currentPage === page ? classes.activePageItem : classes.pageItem}
            >
              {page}
            </button>
          );
        })}
      </ul>
    </Toolbar>
  );
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  rowPerPage: PropTypes.number,
  onPageChanged: PropTypes.func,
  onRowPerPageChanged: PropTypes.func,
  currentPage: PropTypes.number,
};
export default withStyles(styles)(Pagination);
