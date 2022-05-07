// Author: Viren Babubhai Malavia (B00895669)

import React, { useState, useEffect, useContext } from 'react'
import axios_api from '../../../common/axios';
import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../../NavigationBar/Navbar";
import { Container, Box, CssBaseline, TextField, Grid, Typography, Button } from '@mui/material';
import { makeStyles } from "@mui/styles";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import SquareFootOutlinedIcon from '@material-ui/icons/SquareFootOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import LocalLaundryServiceOutlinedIcon from '@material-ui/icons/LocalLaundryServiceOutlined';
import { Divider } from '@material-ui/core';
import LocalLaundryServiceOutlined from '@material-ui/icons/LocalLaundryServiceOutlined';
import { AppContext } from "../../../context/userContext";
import FavoriteButton from '../../Favorites/FavoriteButton/FavoriteButton';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        backgroundColor: "#fff",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        //padding: "1rem",
        boxShadow: "rgb(100 116 139 / 12%) 0px 10px 15px",
        borderRadius: 8,
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
}));

const FavoriteInfo = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [favProperty, setFavProperty] = useState([])
    const { propertyId } = useParams();
    
    useEffect(async () => {
        await axios_api.get(`/properties/getProperty/${propertyId}`)
            .then(response => {
                if (response.data.success) {
                    //console.log(response.data.data);
                    setFavProperty(response.data.data);
                }
                //console.log("success");

            }).catch((err) => {
                setFavProperty([])
                //toast.error(err?.response?.data?.message || "Something went wrong")
            })
        
        //handleSearch(searchText)
    }, []);


    return (
        <>
            <NavigationBar />
            {favProperty ? favProperty.id ? <>
                <Grid container>
                    <Container component="main" maxWidth="md" sx={{ mt: 5 }}>
                        <img src={favProperty.image} width="100%" style={{ marginRight: 'auto', marginLeft: 'auto' }} />
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
                                    {favProperty.title}
                                </Typography>

                                <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray', display: 'flex', alignItems: 'center' }}>
                                    <LocationOnOutlinedIcon />
                                    {favProperty.location}
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
                                            {favProperty.unit_type}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center', }}>
                                            <HotelOutlinedIcon style={{ marginRight: 5 }} />
                                            Bedrooms
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {favProperty.bedrooms}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center', }}>
                                            <BathtubOutlinedIcon style={{ marginRight: 5 }} />
                                            Bathrooms
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {favProperty.bathrooms}
                                        </Typography>
                                    </Box>
                                    <Divider />

                                    <Box width="50%">
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <SquareFootOutlinedIcon style={{ marginRight: 5 }} />
                                            Size(sqft)
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {favProperty.sq_feet}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ChairOutlinedIcon style={{ marginRight: 5 }} />
                                            Furnished
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {favProperty.furnished ? "Yes" : "No"}
                                        </Typography>
                                        <Typography gutterBottom variant="body2" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <LocalLaundryServiceOutlined style={{ marginRight: 5 }} />
                                            Appliances
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ color: 'gray' }}>
                                            {favProperty.appliances}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <Typography gutterBottom variant="h6" component="div" >
                                    Price
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'green' }}>
                                    $ {favProperty.price}
                                </Typography>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
                                    {/* <Box width="50%" sx={{ marginRight: 'auto', marginLeft: 'auto', justifyContent: "center" }} > */}
                                    <Button
                                        //fullWidth
                                        variant="contained"
                                        onClick={(event) => {
                                            navigate("/");
                                        }}
                                        sx={{ mt: 3, mb: 2, mr: 2 }}
                                    >
                                        Book Appointment
                                    </Button>
                                    {/* </Box>
                                <Box width="50%"> */}
                                    <Button
                                        //fullWidth
                                        variant="contained"
                                        onClick={(event) => {
                                            navigate("/");
                                        }}
                                        color="warning"
                                        sx={{ mt: 3, mb: 2, mr: 2 }}
                                    >
                                        Review
                                    </Button>
                                    <FavoriteButton propertyId={favProperty.id}/>
                                    
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

export default FavoriteInfo