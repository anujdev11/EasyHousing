// Author: Arvinder Singh (B00878415)

import React, {useState} from "react";
import {Button, Dialog, DialogTitle, TextField, IconButton} from "@mui/material";
import axios_api from "../../../common/axios";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../../common/constants";
import {CloseOutlined} from "@material-ui/icons";
import {toast} from "react-toastify";

function BookAppointment(props) {

    const navigate = useNavigate();
    const [openBookingDialog, setOpenBookingDialog] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [appointmentConfirmation, setAppointmentConfirmation] = useState(false);
    const [ failedBooking, setFailedBooking ] = useState(false);
    const [ dateError, setDateError ] = useState(false);
    const [ timeError, setTimeError ] = useState(false);
    const currentDate = new Date();

    const handleDate = (event) => {
        const selectedDate = event.target.value;
        if (
            Number(selectedDate.substring(0, 4)) >= currentDate.getFullYear() &&
            Number(selectedDate.substring(5, 7)) >= (currentDate.getMonth() + 1) &&
            Number(selectedDate.substring(8)) >= currentDate.getDate()) {
            setDateError(false);
            setDate(event.target.value);
        } else {
            setDateError(true);
        }
    }

    const handleTime = (event) => {
        const selectedTime = event.target.value;
        if (Number(selectedTime.substring(0, 2)) > currentDate.getHours()) {
            setTimeError(false);
            setTime(event.target.value);
        } else if (Number(selectedTime.substring(0, 2)) === currentDate.getHours()) {
            if (Number(selectedTime.substring(3)) >= currentDate.getMinutes()) {
                setTimeError(false);
                setTime(event.target.value);
            } else {
                setTimeError(true);
                setTime(event.target.value);
            }
        } else {
            setTimeError(true);
            setTime(event.target.value);
        }
    }

    const handleBook = () => {
        if (props.userId) {
            setOpenBookingDialog(true);
        } else {
            navigate(ROUTES.LOGIN);
        }
    }

    const handleAppointmentButton = (event) => {
        if (date && time) {
            axios_api.post("/appointments/addAppointment", {
                property_id: props.propertyId,
                user_id: props.userId,
                appointment_date: date,
                appointment_time: time
            }).then((res) => {
                if (res.data.success) {
                    setOpenBookingDialog(false);
                    setAppointmentConfirmation(true);
                } else {
                    setOpenBookingDialog(false);
                    setFailedBooking(true);
                }
            }).catch((err) => {
                toast.error("Something went wrong");
            })
        } else {
            setOpenBookingDialog(false);
            setFailedBooking(true);
        }
    }

    const handleSuccessClose = (event) => {
        setAppointmentConfirmation(false);
        props.userAppointment();
    }

    const handleFailClose = () => {
        setTime("");
        setDate("");
        setAppointmentConfirmation(false);
        setOpenBookingDialog(true);
    }

    const handleClose = () => {
        setTime("");
        setDate("");
        setDateError(false);
        setTimeError(false);
        setFailedBooking(false);
        setAppointmentConfirmation(false);
        setOpenBookingDialog(false);
    }

    return (
        <div className={"book-appointment"}>
            <Button className={"book-appointment-button"} variant="contained" sx={{ mt: 3, mb: 2, mr: 2 }} onClick={handleBook}>
                Book Appointment
            </Button>
            <Dialog open={openBookingDialog} fullWidth={true}>
                <DialogTitle style={{padding: "0"}}>
                    <div>
                        <div style={{display: "inline-block", textAlign: "center", marginLeft: "8.8em", marginRight: "5em", marginTop: "10px"}}>
                            Appointment Date and Time
                        </div>
                        <div style={{float: "right", display: "inline-block", marginTop: "1px", marginRight: "1px"}}>
                            <IconButton onClick={handleClose}>
                                <CloseOutlined/>
                            </IconButton>
                        </div>
                    </div>
                </DialogTitle>
                <table className={"date-time-table"} style={{textAlign: "center", margin: "40px"}}>
                    <tbody>
                        <tr>
                            <td>
                                <TextField
                                    id={"date"}
                                    label={"Select Date"}
                                    type={"date"}
                                    sx={{width: 180}}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleDate}
                                />
                                <TextField
                                    id={"time"}
                                    label={"Select Time"}
                                    type={"time"}
                                    sx={{width: 180}}
                                    InputLabelProps={{shrink: true}}
                                    onChange={handleTime}
                                />
                                {(!dateError) ? (
                                    ((Number(date.substring(8)) === currentDate.getDate()) && timeError) ? (
                                        <p style={{color: "red"}}>Please select either current or future date and time!!!</p>
                                    ) : null
                                ) : <p style={{color: "red"}}>Please select either current or future date and time!!!</p>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className={"book-appointment-button"} style={{textAlign: "center"}}>
                    {(!dateError) ? (
                        ((Number(date.substring(8)) === currentDate.getDate()) && timeError) ? (
                            <Button variant={"contained"} disabled={true} style={{width: "200px", marginBottom: "20px"}}>Book Appointment</Button>
                        ) : <Button variant={"contained"} style={{width: "200px", marginBottom: "20px"}} onClick={handleAppointmentButton}>Book Appointment</Button>
                    ) : <Button variant={"contained"} disabled={true} style={{width: "200px", marginBottom: "20px"}}>Book Appointment</Button>}
                </div>
            </Dialog>
            <Dialog open={appointmentConfirmation} fullWidth={true}>
                <p className={"confirmation-message"} style={{textAlign: "center", marginTop: "20px"}}>Appointment Confirmed!!!</p>
                <div className={"appointment-dialog-close"} style={{textAlign: "center", margin: "20px"}}>
                    <Button
                        className={"appointment-dialog-close-button"}
                        variant={"contained"} style={{width: "200px"}}
                        onClick={handleSuccessClose}>
                            Close
                    </Button>
                </div>
            </Dialog>
            <Dialog open={failedBooking} fullWidth={true}>
                <p className={"fail-message"} style={{textAlign: "center", marginTop: "20px"}}>Appointment Booking Failed!!!</p>
                <div className={"appointment-fail-close"} style={{textAlign: "center", margin: "20px"}}>
                    <Button
                        className={"appointment-fail-close-button"}
                        variant={"contained"} style={{width: "200px"}}
                        onClick={handleFailClose}>
                            Close
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

export default BookAppointment;