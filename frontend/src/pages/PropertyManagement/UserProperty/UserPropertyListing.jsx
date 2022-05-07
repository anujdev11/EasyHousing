// Author: Purvilkumar Bharthania (B00901605)

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
  CssBaseline,
  CardMedia,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HouseIcon from "@mui/icons-material/House";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Navbar from "../../NavigationBar/Navbar";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants";
import { AppContext } from "../../../context/userContext";
import { toast } from "react-toastify";
import axios_api from "../../../common/axios";
import * as ActionTypes from "../../../common/actionTypes";
const UserPropertyListing = () => {
  const [properties, setProperties] = useState(null);
  const {
    state: { authenticated, authToken, currentUser, userId },
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
    console.log(authenticated);
    // if (!authenticated) {
    //   navigate(ROUTES.HOMEPAGE);
    // }
    getProfile();
    getPropertyData();
  }, [authenticated]);

  const handleDelete = async (propertyId) => {
    await axios_api
      .delete(`/properties/deleteProperty/${propertyId}`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.message);
          toast.success(response?.data?.message);
          getPropertyData();
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };
  const handleUpdate = (propertyId) => {
    navigate(`/update_property/${propertyId}`);
  };

  const getPropertyData = () => {
    axios_api
      .get(`/properties/getMyProperties/${userId}`)
      .then((response) => {
        if (response.data.success) {
          setProperties(response.data.data);
        }
      })
      .catch((err) => {
        setProperties([]);
      });
  };

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
            <Grid item lg={8} md={6} xs={12}>
              <Typography sx={{ mb: 3 }} variant="h4">
                My Properties Posted
              </Typography>
              <Grid container spacing={2}>
                {properties
                  ? properties.length > 0
                    ? properties.map((property) => (
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={6}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Card sx={{ width: "100%", maxWidth: "345" }}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={property.image}
                              alt="property image"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                textOverflow="ellipsis"
                                overflow="hidden"
                                whiteSpace="nowrap"
                              >
                                {property.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                textOverflow="ellipsis"
                                overflow="hidden"
                                whiteSpace="nowrap"
                              >
                                {property.location}
                              </Typography>
                              <br />
                              <Typography
                                variant="body1"
                                color="text.secondary"
                              >
                                ${property.price}
                              </Typography>
                            </CardContent>
                            <Divider />
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Button
                                //fullWidth
                                variant="contained"
                                onClick={(event) => handleUpdate(property.id)}
                                sx={{ mt: 3, mb: 2, mr: 2 }}
                              >
                                Update
                              </Button>
                              <Button
                                //fullWidth
                                variant="contained"
                                onClick={() => handleDelete(property.id)}
                                sx={{ mt: 3, mb: 2, mr: 2 }}
                              >
                                Delete
                              </Button>
                            </Box>
                          </Card>
                        </Grid>
                      ))
                    : "No results Found"
                  : " Fetching properties"}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default UserPropertyListing;
