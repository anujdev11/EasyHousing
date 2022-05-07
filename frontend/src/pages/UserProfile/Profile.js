// Author: Anuj Dev (B00900887)

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Navbar from "../NavigationBar/Navbar";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/constants";
import { AppContext } from "../../context/userContext";
import { toast } from "react-toastify";
import axios_api from "../../common/axios";
import * as ActionTypes from "../../common/actionTypes";

const Profile = () => {
  const {
    state: { authenticated, authToken, currentUser },
    dispatch,
  } = useContext(AppContext);
  let navigate = useNavigate();
  const getProfile = async () => {
    const config = {
      headers: { Authorization: `${authToken}` },
    };
    try {
      const res = await axios_api.get("/users/userProfile", config);
      const { data } = res;

      if (data.success) {
        dispatch({ type: ActionTypes.SET_CURRENT_USER, data: data.data });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (!authToken) {
      navigate(ROUTES.HOMEPAGE);
    }
    getProfile();
  }, [authToken]);
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
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
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
                      onClick={() => {
                        navigate(ROUTES.ROOMMATE_FINDER_MY_LISTINGS);
                      }}
                      fullWidth
                      variant="text"
                      startIcon={<HouseIcon />}
                    >
                      My Roommate
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
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Profile;
