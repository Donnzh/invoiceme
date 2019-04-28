import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    marginRight: theme.spacing.unit * 2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 7,
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingLeft: theme.spacing.unit * 7,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 162,
      "&:focus": {
        width: 210,
      },
    },
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  buttonText: {
    lineHeight: "initial",
  },
});

function HeaderBar(props) {
  const { classes, onSearch, onButtonClick } = props;
  const onSearchInput = e => {
    onSearch(e.target.value);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          Invoices List
        </Typography>
        <div className={classes.grow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onChange={onSearchInput}
            placeholder="Search comments…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <div>
          <Button
            onClick={onButtonClick}
            variant="contained"
            size="medium"
            color="primary"
            className={classes.button}
          >
            <Typography variant="subtitle1" color="inherit" noWrap className={classes.buttonText}>
              New
            </Typography>
            <AddIcon className={classes.rightIcon} />
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func,
};

export default withStyles(styles)(HeaderBar);
