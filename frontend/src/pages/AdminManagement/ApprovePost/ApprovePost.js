// Author: Viren Babubhai Malavia (B00895669)

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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const ApprovePost = (props) => {
  const [openMsg, setOpenMsg] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpenMsg(true);
  };

  const handleClose = () => {
    setOpenMsg(false);
  };

  const handleApproveButton = (event) => {
    axios_api
      .delete(`/reports/deleteAllReports/${props.propertyId}`)
      .then((response) => {
        if (response.data.success) {
          setOpenMsg(false);
          toast.success("Property Approved Successfully!");
          navigate(ROUTES.VIEW_ADMIN_PAGE);
        }
      })
      .catch((err) => {
        toast.error(
          "Property could not be Approved. Please try again later." ||
            "Something went wrong"
        );
      });
  };

  return (
    <>
      <Button
        color="success"
        variant="contained"
        sx={{ mt: 3, mb: 2, mr: 2 }}
        startIcon={<CheckCircleIcon />}
        onClick={handleClickOpen}
      >
        Approve
      </Button>
      <Dialog open={openMsg} onClose={handleClose}>
        <DialogTitle>Approve Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to 'Approve' this posted ad?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            color="success"
            variant="outlined"
            startIcon={<CheckCircleIcon />}
            onClick={handleApproveButton}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApprovePost;
