// Author: Arvinder Singh (B00878415)

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../NavigationBar/Navbar";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    Typography
} from "@mui/material";
import { ROUTES } from "../../../common/constants";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import ReviewsIcon from "@mui/icons-material/Reviews";
import axios_api from "../../../common/axios";
import CancelAppointment from "../CancelAppointment/CancelAppointment";
import {toast} from "react-toastify";

function Appointments() {

    const {
        state: { authenticated, userId, currentUser }
    } = useContext(AppContext);
    let navigate = useNavigate();

    const [userAppointments, setUserAppointments] = useState([]);

    const userAppointment = async () => {
        axios_api.get("/appointments/getAllAppointments/" + userId).then((res) => {
            if (res.data.success) {
                setUserAppointments(res.data.appointments);
            }
        }).catch((err) => {
            if (err.response && err.response.status === 404) {
                setUserAppointments([]);
            } else {
                toast.error("Something went wrong");
            }
        });
    }

    useEffect(() => {
        if (!authenticated) {
            navigate(ROUTES.HOMEPAGE);
        }
        userAppointment();
    }, []);

    return (
        <div>
            <Navbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    backgroundColor: "#F9FAFC",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
                        <Grid item xs={4}>
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "center",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Avatar
                                            src={currentUser.imgURL}
                                            sx={{
                                                height: 100,
                                                mb: 2,
                                                width: 100,
                                            }}
                                        />
                                        <Typography color="textPrimary" gutterBottom variant="h5">
                                            {currentUser.firstName + " " + currentUser.lastName}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Divider />

                                <CardActions>
                                    <Button
                                        onClick={() => navigate(ROUTES.EDIT_PROFILE)}
                                        color="primary"
                                        fullWidth
                                        variant="text"
                                        startIcon={<EditIcon />}
                                    >
                                        Edit Profile
                                    </Button>
                                </CardActions>
                            </Card>

                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "left",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="text"
                                            startIcon={<HouseIcon />}
                                            onClick={() => navigate(ROUTES.USERS_PROPERTY)}
                                        >
                                            My Properties
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "left",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="text"
                                            startIcon={<HouseIcon />}
                                            onClick={() => navigate(ROUTES.MY_SERVICES)}
                                        >
                                            My Services
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "left",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            onClick={()=>{
                                                navigate(ROUTES.ROOMMATE_FINDER_MY_LISTINGS)
                                            }}
                                            fullWidth
                                            variant="text"
                                            startIcon={<HouseIcon />}
                                        >
                                            My Roommate listings
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>

                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "left",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="text"
                                            startIcon={<ReviewsIcon />}
                                            onClick={() => navigate(ROUTES.REVIEW)}
                                        >
                                            My Reviews
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                            <Card sx={{ mt: 2 }}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: "left",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            fullWidth
                                            variant="text"
                                            startIcon={<ReviewsIcon />}
                                            onClick={() => navigate(ROUTES.APPOINTMENTS)}
                                        >
                                            My Appointments
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8} style={{ textAlign: "center" }}>
                            <Typography style={{ textAlign: "left", fontSize: "x-large" }}><b>Appointments</b></Typography>
                            <Divider variant={"fullWidth"} />
                            {userAppointments.length < 1 ? (
                                <div style={{ textAlign: "center", margin: "20%" }}>
                                    <p style={{ color: "gray" }}>No Appointments</p>
                                </div>
                            ) : (
                                <div>
                                    {userAppointments.map(value => (
                                        <Grid key={value.appointment_id} style={{ margin: "5%" }}>
                                            <Card>
                                                <CardContent>
                                                    <img src={value.property_image} alt={"image"} style={{ width: "200px", height: "200px", margin: "5%" }} />
                                                    <p style={{ margin: "2%" }}><b>Property Address: </b>{value.property_location}</p>
                                                    <p style={{ margin: "2%" }}><b>Appointment Date: </b>{value.appointment_date.toString().substring(0, 10)}</p>
                                                    <p style={{ margin: "2%" }}><b>Appointment Time: </b>{value.appointment_time}</p>
                                                    <CancelAppointment userId={value.user_id} propertyId={value.property_id} userAppointment={userAppointment}/>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default Appointments;