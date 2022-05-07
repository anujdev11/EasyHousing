// Author: Purvilkumar Bharthania (B00901605)

import React from 'react'
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants";
import axios_api from "../../../common/axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button } from '@mui/material';
import { toast } from "react-toastify";

const CancelReport = (props) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelButton = (event) => {

        axios_api.delete(`/reports/deleteReport/${props.userId}/${props.propertyId}`)
            .then(response => {
                if (response.data.success) {
                    setOpen(false);
                    props.reportStatus();
                    //props.setReported(false);
                    toast.success(response?.data?.message);
                }

            }).catch((err) => {
                toast.error(err?.response?.data?.message || "Something went wrong")
            })
    }

    return (
        <>
            <Button variant="contained" sx={{ mt: 3, mb: 2, mr: 2 }} onClick={handleClickOpen}>
                Cancel Report
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cancel Report</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to Cancel Reporting of this property?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleCancelButton}>Cancel Report</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CancelReport