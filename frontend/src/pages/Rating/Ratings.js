// Author: Arvinder Singh (B00878415)

import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/userContext";
import {useNavigate} from "react-router-dom";
import Navbar from "../NavigationBar/Navbar";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid, Rating,
    Typography
} from "@mui/material";
import {ROUTES} from "../../common/constants";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import ReviewsIcon from "@mui/icons-material/Reviews";
import axios_api from "../../common/axios";
import {toast} from "react-toastify";

function Ratings() {

    const {
        state: { authenticated, userId, currentUser}
    } = useContext(AppContext);
    let navigate = useNavigate();

    const [userRatings, setUserRatings] = useState([]);

    const userRating = async () => {
        axios_api.get("/ratings/getUserRatings/" + userId).then((res) => {
            if (res.data.success) {
                setUserRatings(res.data.ratings);
            }
        }).catch((err) => {
            if (err.response && err.response.status === 404) {
                setUserRatings([]);
            } else {
                toast.error("Something went wrong");
            }
        })
    }

    useEffect(() => {
        if (!authenticated) {
            navigate(ROUTES.HOMEPAGE);
        }
        userRating();
    }, []);

    const handleClick = (event) => {
        axios_api.post("/ratings/addRating", {
            property_id: event.property,
            user_id: event.user,
            rating: event.rating
        }).then((res) => {
            if (res.data.success) {
                userRating();
            }
        }).catch((err) => {
            if (err.response) {
                if (err.response.status !== 404) {
                    toast.error("Something went wrong");
                }
            } else {
                toast.error("Something went wrong");
            }
        });
    }

    const handleEdit = (event) => {
        axios_api.put('/ratings/updateRating/' + event.user + '/' + event.property, {
            property_id: event.property,
            user_id: event.user,
            rating: event.rating
        }).then((res) => {
            if (res.data.success) {
                userRating();
            }
        }).catch((err) => {
            if (err.response) {
                if (err.response.status !== 404) {
                    toast.error("Something went wrong");
                }
            } else {
                toast.error("Something went wrong");
            }
        });
    }

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
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3}}>
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
                        <Grid item xs={8}>
                            <Button variant={"outlined"} onClick={() => navigate(ROUTES.REVIEW)}>Add Reviews</Button>
                            <Button variant={"contained"} onClick={() => navigate(ROUTES.RATING)}>Add Ratings</Button>
                            <Divider variant={"fullWidth"}/>
                            {userRatings.length < 1 ? (
                                <div style={{textAlign: "center", margin: "20%"}}>
                                    <p style={{color: "gray"}}>No Property is available for Ratings</p>
                                </div>
                            ) : (
                                <div style={{marginTop: "2%"}}>
                                    {userRatings.map(value => (
                                        <Grid key={value.property_id}>
                                            <Card style={{marginTop: "5%"}} variant={"outlined"}>
                                                <CardContent>
                                                    <img src={value.images} alt={"image"} style={{width: "300px", height: "200px", paddingRight: "5%"}}/>
                                                    {(value.rating < 0) ? (
                                                        <Rating precision={0.5} onChange={ (event, rateNumber) => {handleClick({user: value.user_id, property: value.property_id, rating: rateNumber})}}/>
                                                    ) : (
                                                        <Rating precision={0.5} value={value.rating} onChange={(event, rateNumber) => {handleEdit({user: value.user_id, property: value.property_id, rating: rateNumber})}}/>
                                                    )}
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

export default Ratings;