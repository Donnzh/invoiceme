import React, { Fragment, useState, useEffect } from "react";
import _debounce from "lodash/debounce";
import { fetchData, dateFormat } from "helper";
import HeaderBar from "components/HeaderBar";
import NotificationBar from "components/Notification";
import InvoiceTable from "./InvoiceTable";
import Dialog from "./Dialog";

function HomePage() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [notifyInfo, setNotifyInfo] = useState(null);

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = () => {
    fetchData()
      .then(response => response.json())
      .then(response => dateFormat(response))
      .then(response => {
        setInvoiceData(response);
        setUpdatedData(response);
      });
  };

  const onSearchUpdate = _debounce(searchInput => {
    if (!searchInput) {
      setUpdatedData(invoiceData);
      return;
    }
    const updateData = invoiceData.filter(data => data.comment.toLowerCase().includes(searchInput));
    setUpdatedData(updateData);
  }, 200);

  const dialogCloseHandler = () => setIsOpenDialog(false);

  const editInvoiceDialog = data => {
    setCurrentInvoice(data);
    setIsOpenDialog(true);
  };

  const newInvoiceDialog = () => {
    setCurrentInvoice(null);
    setIsOpenDialog(true);
  };

  const invoiceActions = invoice => type => {
    let fetchMethod;
    let successMessage;
    switch (type) {
      case "delete":
        fetchMethod = "DELETE";
        successMessage = `Invoice deleted`;
        break;
      case "new":
        fetchMethod = "POST";
        successMessage = `Invoice added`;
        break;
      case "edit":
        fetchMethod = "PUT";
        successMessage = `Invoice updated`;
        break;
      default:
        break;
    }

    const options = fetchMethod === "DELETE" ? {} : { body: JSON.stringify(invoice) };
    fetchData(fetchMethod, invoice.id, options).then(() => {
      getInvoices();
      setNotifyInfo(successMessage);
      setIsOpenDialog(false);
    });
  };

  return (
    <Fragment>
      <NotificationBar notifyInfo={notifyInfo} />
      <Dialog
        isOpen={isOpenDialog}
        closeHandler={dialogCloseHandler}
        dialogData={currentInvoice}
        submitHandler={invoiceActions}
      />
      <HeaderBar onButtonClick={newInvoiceDialog} onSearch={onSearchUpdate} />
      <InvoiceTable
        tableData={updatedData}
        onEditClick={editInvoiceDialog}
        onDeleteClick={invoiceActions}
      />
    </Fragment>
  );
}

export default HomePage;
