// Author: Purvilkumar Bharthania (B00901605)

import React, { useState, useEffect, useContext } from 'react'
import axios_api from '../../../common/axios';
import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../../NavigationBar/Navbar";
import { Container, Box, CssBaseline, TextField, Grid, Typography, Button, Dialog } from '@mui/material';
import { makeStyles } from "@mui/styles";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import SquareFootOutlinedIcon from '@material-ui/icons/SquareFootOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import { Divider } from '@material-ui/core';
import LocalLaundryServiceOutlined from '@material-ui/icons/LocalLaundryServiceOutlined';
import { AppContext } from "../../../context/userContext";
import { ROUTES } from "../../../common/constants";

import FavoriteButton from '../../Favorites/FavoriteButton/FavoriteButton';
import ShowReviews from "../../Review/ShowReviews";
import BookAppointment from "../../Appointment/BookAppointment/BookAppointment";
import CancelAppointment from "../../Appointment/CancelAppointment/CancelAppointment";
import AddReport from '../../Report/AddReport/AddReport';
import CancelReport from '../../Report/CancelReport/CancelReport';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        backgroundColor: "#fff",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow: "rgb(100 116 139 / 12%) 0px 10px 15px",
        borderRadius: 8,
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
}));

const PropertyInfo = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [property, setProperty] = useState([])
    const { propertyId } = useParams();
    const [userAppointments, setUserAppointments] = useState("");
    const [userReport, setUserReport] = useState("");
    const [reported, setReported] = React.useState(false);

    const {
        state: { userId }
    } = useContext(AppContext);

    useEffect(async () => {
        await axios_api.get(`/properties/getProperty/${propertyId}`)
            .then(response => {
                if (response.data.success) {
                    setProperty(response.data.data);
                }

            }).catch((err) => {
                setProperty([])
            })

        await axios_api.get(`/reports/getReport/${userId}/${propertyId}`).then((res) => {
            if (res.data.success) {
                setUserReport(res.data.report);
                //setReported(true);
            } else {
                setUserReport("");
            }
        }).catch(error => {
            setUserReport("");
        })
        //handleSearch(searchText)
    }, [])

    const reportStatus = () => {
        axios_api.get(`/reports/getReport/${userId}/${propertyId}`).then((res) => {
            if (res.data.success) {
                setUserReport(res.data.report);
                //setReported(true);
            } else {
                setUserReport("");
            }
        }).catch(error => {
            setUserReport("");
        })
    };

    const userAppointment = () => {
        axios_api.get(`/appointments/getAppointment/${userId}/${propertyId}`).then((res) => {
            if (res.data.success) {
                setUserAppointments(res.data.appointment);
            } else {
                setUserAppointments("");
            }
        }).catch(error => {
            setUserAppointments("");
        })
    }

    useEffect(async () => {
        await axios_api.get(`/appointments/getAppointment/${userId}/${propertyId}`).then((res) => {
            if (res.data.success) {
                setUserAppointments(res.data.appointment);
            } else {
                setUserAppointments("");
            }
        }).catch(error => {
            setUserAppointments("");
        })
    }, [])

    return (
        <>
            <NavigationBar />
            {property ? property.id ? <>
                <Grid container>
                    <Container component="main" maxWidth="md" sx={{ mt: 5 }}>
                        <img src={property.image} width="100%" style={{ marginRight: 'auto', marginLeft: 'auto' }} />
                        <div className={classes.paper} >
                            <Box margin="10px"
                                sx={{

                                    //marginTop: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    //alignItems: 'center',
                                }}
                            >

                                <Typography gutterBottom variant="h5" component="div">
                                    {property.title}
                                </Typography>

                                <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray', display: 'flex', alignItems: 'center' }}>
                                    <LocationOnOutlinedIcon />
                                    {property.location}
                                </Typography>
                                <Divider />
                                <Typography gutterBottom variant="h6" component="div" sx={{ color: 'purple' }}>
                                    The Unit
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Box width="50%">
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center', }}>
                                            <HotelOutlinedIcon style={{ marginRight: 5 }} />
                                            Unit Type
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {property.unit_type}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center', }}>
                                            <HotelOutlinedIcon style={{ marginRight: 5 }} />
                                            Bedrooms
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {property.bedrooms}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center', }}>
                                            <BathtubOutlinedIcon style={{ marginRight: 5 }} />
                                            Bathrooms
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {property.bathrooms}
                                        </Typography>
                                    </Box>
                                    <Divider />

                                    <Box width="50%">
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <SquareFootOutlinedIcon style={{ marginRight: 5 }} />
                                            Size(sqft)
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {property.sq_feet}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ChairOutlinedIcon style={{ marginRight: 5 }} />
                                            Furnished
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {property.furnished ? "Yes" : "No"}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <LocalLaundryServiceOutlined style={{ marginRight: 5 }} />
                                            Appliances
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {property.appliances}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <Typography gutterBottom variant="h6" component="div" >
                                    Price
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'green' }}>
                                    $ {property.price}
                                </Typography>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                                    {/* <Box width="50%" sx={{ marginRight: 'auto', marginLeft: 'auto', justifyContent: "center" }} > */}
                                    {((userAppointments !== "") && (userId)) ? (
                                        <CancelAppointment userId={userId} propertyId={propertyId} userAppointment={userAppointment} />
                                    ) : (
                                        <BookAppointment userId={userId} propertyId={propertyId} userAppointment={userAppointment} />
                                    )}
                                    {/* </Box>
                                            <Box width="50%"> */}
                                    <ShowReviews propertyId={propertyId} />
                                    <FavoriteButton propertyId={property.id} />
                                    {((userReport !== "") && (userId)) ? (
                                        <CancelReport userId={userId} propertyId={propertyId} reportStatus={reportStatus} />
                                    ) : (
                                        <AddReport userId={userId} propertyId={propertyId} reportStatus={reportStatus} />
                                    )}
                                    {/* <Button
                                                //fullWidth
                                                variant="contained"
                                                onClick={(event) => {
                                                    navigate("/");
                                                 }}
                                                color="error"
                                                sx={{ mt: 3, mb: 2, mr: 2, }}
                                            >
                                                Report
                                            </Button> */}
                                    {/* </Box> */}
                                </Box>

                            </Box>
                        </div>
                    </Container>
                </Grid>
            </> : "Cannot find requested property." : "Fetching property details."}
        </>
    )
}

export default PropertyInfo