import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  success: {
    backgroundColor: green[500],
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: 6,
  },
});

function Notification(props) {
  const { classes, notifyInfo } = props;
  const isNotify = notifyInfo ? true : false;
  const [isOpen, setIsOpen] = useState(isNotify);

  useEffect(() => {
    setIsOpen(isNotify);
  }, [notifyInfo]);

  const handleClose = () => setIsOpen(false);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isOpen}
      autoHideDuration={1500}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes.success}
        aria-describedby="action notification"
        message={
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            {notifyInfo}
          </span>
        }
        action={
          <IconButton aria-label="Close" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Snackbar>
  );
}

Notification.propTypes = {
  notifyInfo: PropTypes.string,
};

export default withStyles(styles)(Notification);
