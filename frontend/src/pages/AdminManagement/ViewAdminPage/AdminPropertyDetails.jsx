// Author: Viren Babubhai Malavia (B00895669)

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

import ApprovePost from '../ApprovePost/ApprovePost';
import EditPost from '../EditPost/EditPost';
import DeletePost from '../DeletePost/DeletePost';

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

const AdminPropertyDetails = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [property, setProperty] = useState([]);
    const { propertyId } = useParams();
    const [userReport, setUserReport] = useState("");
    const [count, setCount] = useState(0);

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

        await axios_api.get(`/reports/getTotalReports/${propertyId}`).then((res) => {
            if (res.data.success) {
                setUserReport(res.data.report);
                setCount(res.data.count);
            } else {
                setUserReport("");
            }
        }).catch(error => {
            setUserReport("");
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
                                <Typography gutterBottom variant="h6" component="div">
                                    Price
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: 'green' }}>
                                    $ {property.price}
                                </Typography>
                                <Divider />
                                <Typography gutterBottom variant="h5" align="center" component="div" sx={{ color: 'red' }}>
                                    Admin Related Information:
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black' }}>
                                    Ad is posted by User with user_id: '{property.user_id}'
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div" sx={{ color: 'black' }}>
                                    Total count of Users who Reported this post: '{count}'
                                </Typography>
                                <Divider />
                                <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>

                                    <ApprovePost userId={userId} propertyId={propertyId} />
                                    <EditPost userId={userId} propertyId={propertyId} />
                                    <DeletePost userId={userId} propertyId={propertyId} />
                                    
                                </Box>

                            </Box>
                        </div>
                    </Container>
                </Grid>
            </> : "Cannot find requested property." : "Fetching property details."}
        </>
    )
}

export default AdminPropertyDetails