// Author: Purvilkumar Bharthania (B00901605)

import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants";
import axios_api from "../../../common/axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

const AddReport = (props) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReport = () => {
    if (props.userId) {
      setOpen(true);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleReportButton = (event) => {
    axios_api
      .post("/reports/addReport", {
        property_id: props.propertyId,
        user_id: props.userId,
      })
      .then((res) => {
        if (res.data.success) {
          setOpen(false);
          props.reportStatus();
          //props.setReported(true);
          toast.success(res?.data?.message);
        } else {
          setOpen(false);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2, mr: 2 }}
        onClick={handleReport}
      >
        Report Property
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to report this property?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleReportButton}>Report</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default AddReport;
