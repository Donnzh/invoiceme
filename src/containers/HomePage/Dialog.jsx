import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import dateFns from "date-fns";

function DialogForm(props) {
  const { dialogData, closeHandler, fullScreen, isOpen, submitHandler } = props;

  let formData = dialogData ? dialogData : {};
  formData.invoiceDate = dateFns.format(
    formData.invoiceDate ? formData.invoiceDate : new Date(),
    "YYYY-MM-DD"
  );

  const onFormSubmit = e => {
    e.preventDefault();
    submitHandler(formData)(formData.id ? "edit" : "new");
  };

  const onFormUpdate = key => element => {
    if (key === "name") {
      element.target.value = element.target.value.replace(/\d+/g, ""); // disable number input in "name" field
    }
    if (key === "amount") {
      element.target.value = element.target.value.replace(/[^0-9.]/g, ""); // only number input in "amount" field
    }
    formData[key] = element.target.value;
  };

  const EditForm = data => (
    <form autoComplete="off" onSubmit={onFormSubmit}>
      <Typography variant="h6" gutterBottom>
        {data.name ? "Edit Invoice" : "New Invoice"}
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        ID: {data.id}
      </Typography>
      <Grid container spacing={32}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoFocus
            required
            name="Name"
            label="Name"
            margin="normal"
            defaultValue={data.name}
            fullWidth
            onChange={onFormUpdate("name")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="Date"
            label="Date"
            type="date"
            defaultValue={data.invoiceDate}
            margin="normal"
            onChange={onFormUpdate("invoiceDate")}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={32}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Comments"
            fullWidth
            defaultValue={data.comment}
            margin="normal"
            onChange={onFormUpdate("comment")}
            multiline={true}
            rows={1}
            rowsMax={4}
          />
        </Grid>
      </Grid>
      <Grid container spacing={32}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="text"
            margin="dense"
            variant="outlined"
            label="Amount"
            helperText="e.g.: 500.80"
            onChange={onFormUpdate("amount")}
            defaultValue={data.amount}
            inputProps={{
              startadornment: <InputAdornment position="start">$</InputAdornment>,
              pattern: "[1-9][0-9]*[.][0-9][0-9]",
            }}
          />
        </Grid>
      </Grid>
      <DialogActions>
        <Button type="submit" color="primary">
          Save
        </Button>
        <Button color="primary" onClick={closeHandler}>
          Cancel
        </Button>
      </DialogActions>
    </form>
  );

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={isOpen} maxWidth={"sm"}>
      <DialogContent>{EditForm(formData)}</DialogContent>
    </Dialog>
  );
}

DialogForm.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  dialogData: PropTypes.object,
  submitHandler: PropTypes.func.isRequired,
};

export default withMobileDialog({ breakpoint: "xs" })(DialogForm);
