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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";

const DeletePost = (props) => {
  const [openMsg, setOpenMsg] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpenMsg(true);
  };

  const handleClose = () => {
    setOpenMsg(false);
  };

  const handleDeleteButton = (event) => {
    axios_api
      .delete(`/properties/deleteProperty/${props.propertyId}`)
      .then((response) => {
        if (response.data.success) {
          setOpenMsg(false);
          toast.success("Property Deleted Successfully!");
          navigate(ROUTES.VIEW_ADMIN_PAGE);
          axios_api
            .delete(`/reports/deleteAllReports/${props.propertyId}`)
            .catch((err) => {
              toast.error(
                "Property could not be Deleted from Reports. Please try again later." ||
                  "Something went wrong"
              );
            });
        }
      })
      .catch((err) => {
        toast.error(
          "Property could not be Deleted. Please try again later." ||
            "Something went wrong"
        );
      });
  };

  return (
    <>
      <Button
        color="error"
        variant="contained"
        startIcon={<DeleteForeverIcon />}
        sx={{ mt: 3, mb: 2, mr: 2 }}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog open={openMsg} onClose={handleClose}>
        <DialogTitle>Delete Post Permanently</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to 'Permanently Delete' this posted ad from
            the Application? Once Deleted, cannot be undone.
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
            startIcon={<DeleteForeverIcon />}
            color="error"
            variant="outlined"
            onClick={handleDeleteButton}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePost;
