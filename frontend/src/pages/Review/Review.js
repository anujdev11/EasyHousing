// Author: Arvinder Singh (B00878415)

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
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
    Grid, TextField,
    Typography
} from "@mui/material";
import { ROUTES } from "../../common/constants";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import ReviewsIcon from "@mui/icons-material/Reviews";
import axios_api from "../../common/axios";
import {toast} from "react-toastify";

function Review() {

    const {
        state: { authenticated, userId, currentUser }
    } = useContext(AppContext);
    let navigate = useNavigate();

    const [userReviews, setUserReviews] = useState([]);

    const userReview = async () => {
        axios_api.get("/reviews/getUserReviews/" + userId).then((res) => {
            if (res.data.success) {
                setUserReviews(res.data.reviews);
            }
        }).catch((err) => {
            if (err.response && err.response.status === 404) {
                setUserReviews([]);
            } else {
                toast.error("Something went wrong");
            }
        })
    }

    useEffect(() => {
        if (!authenticated) {
            navigate(ROUTES.HOMEPAGE);
        }
        userReview();
    }, []);

    const handleClick = (event) => {
        if (review.length > 0) {
            axios_api.post("/reviews/addReview", {
                property_id: event.property,
                user_id: event.user,
                review: review
            }).then((res) => {
                if (res.data.success) {
                    userReview();
                }
            }).catch((err) => {
                if (err.response) {
                    if (err.response.status !== 404) {
                        toast.error("Something went wrong");
                    }
                } else {
                    toast.error("Something went wrong");
                }
            })
        } else {
            alert("Please enter some text in review box to post!!!")
        }
    }

    const handleEdit = (event) => {
        axios_api.delete('/reviews/deleteReview/' + event.user + '/' + event.property).then((res) => {
            if (res.data.success) {
                userReview();
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

    const [review, setReview] = useState("");

    const handleText = (event) => {
        setReview(event.target.value);
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
                    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
                            <Button variant={"contained"} onClick={() => navigate(ROUTES.REVIEW)}>Add Reviews</Button>
                            <Button variant={"outlined"} onClick={() => navigate(ROUTES.RATING)}>Add Ratings</Button>
                            <Divider variant={"fullWidth"} />
                            {userReviews.length < 1 ? (
                                <div style={{ textAlign: "center", margin: "20%" }}>
                                    <p style={{ color: "gray" }}>No Property is available for Review</p>
                                </div>
                            ) : (
                                <div>
                                    {userReviews.map(value => (
                                        <Card key={value.property_id} style={{marginTop: "5%"}} variant={"outlined"}>
                                            <CardContent>
                                                <Grid container style={{margin: "auto"}}>
                                                    <Grid item style={{marginRight: "2%"}}>
                                                        <img src={value.images} alt={"image"} style={{ width: "300px", height: "200px" }} />
                                                    </Grid>
                                                    <Grid item>
                                                        <div>
                                                            {value.review.length > 0 ? (
                                                                <p style={{ width: "380px", height: "150px" }}>{value.review}</p>
                                                            ) : (
                                                                <TextField multiline rows={5} type={"text"} maxLength={250} style={{ width: "380px", height: "150px" }} onChange={handleText} />
                                                            )}
                                                        </div>
                                                        <div style={{textAlign: "end", marginTop: "3.2%"}}>
                                                            {value.review.length > 0 ? (
                                                                <Button variant={"contained"} onClick={() => handleEdit({ user: value.user_id, property: value.property_id })}>Edit Review</Button>
                                                            ) : (
                                                                <Button variant={"contained"} onClick={() => handleClick({ user: value.user_id, property: value.property_id })}>Post Review</Button>
                                                            )}
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
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

export default Review;