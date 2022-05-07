// Author: Arvinder Singh (B00878415)

import React, {useState} from "react";
import {Button, Dialog} from "@mui/material";
import axios_api from "../../../common/axios";
import {toast} from "react-toastify";

function CancelAppointment(props) {

    const [openDialog, setOpenDialog] = useState(false);

    const handleClose = (event) => {
        setOpenDialog(false);
        props.userAppointment();
    }

    const handleCancel = () => {
        axios_api.put(`/appointments/deleteAppointment/${props.userId}/${props.propertyId}`).then((res) => {
            if (res.data.success) {
                setOpenDialog(true);
            }
        }).catch((err) => {
            toast.error("Something went wrong");
        })
    }

    return (
        <div className={"cancel-appointment"}>
            <Button className={"cancel-button"} variant={"contained"} sx={{mt: 3, mb: 2, mr: 2}} onClick={handleCancel}>
                Cancel Appointment
            </Button>
            <Dialog open={openDialog} fullWidth={true}>
                <p className={"dialog-text"} style={{textAlign: "center", margin: "20px"}}>Appointment Cancelled!!!</p>
                <div className={"dialog-close"} style={{textAlign: "center"}}>
                    <Button className={"dialog-close-button"} variant={"contained"} style={{marginBottom: "20px", width: "200px"}} onClick={handleClose}>
                        Close
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default CancelAppointment;