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
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const EditPost = (props) => {
  const [openMsg, setOpenMsg] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpenMsg(true);
  };

  const handleClose = () => {
    setOpenMsg(false);
  };

  const handleEditButton = (event) => {
    navigate(`/update_property/${props.propertyId}`);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2, mr: 2 }}
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog open={openMsg} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to 'Edit' this posted ad?
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
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEditButton}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPost;
