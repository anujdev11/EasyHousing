// Author: Viren Babubhai Malavia (B00895669)

import React, { useEffect, useState, useContext } from 'react'
import NavigationBar from "../../NavigationBar/Navbar";
import { Container, Box, CssBaseline, TextField, Grid } from '@mui/material';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import axios_api from '../../../common/axios';
import { useNavigate } from 'react-router';
import { AppContext } from "../../../context/userContext";
import FavoritesHeading from "../../../Components/Favorites/FavoritesHeading";
// import Footer from "../../Footer/Footer";


const initialState = {
    filter: 'city',
    value1: '',
    value2: '',
};

const ViewAdminPage = () => {
    const {
        state: { authenticated, userId, currentUser },
    } = useContext(AppContext);

    const navigate = useNavigate();

    const [reportedPropertyDetails, setReportedPropertyDetails] = useState([]);
    
    const adminPageDetails = (data) => {
        data.map((reportedData) => (
            axios_api.get(`/properties/getProperty/${reportedData.property_id}`).then((res) => {
                if(res.data.success){
                    setReportedPropertyDetails(prev => ([...prev, res.data.data]));
                };   
            })
        ))
    }

    useEffect( () => {
        axios_api.get(`/reports/getAllReports/`).then((res) => {
            if(res.data.success){
                adminPageDetails(res.data.data);
            }
        });
    }, [])

    const handleClick = (propertyId) => {
        navigate(`/admin_page_postdetails/${propertyId}`);
    };

    return (
        <>
            <NavigationBar />
            <FavoritesHeading heading="Admin Page - Reported Properties" />
            <Container component="main" maxWidth='xl' style={{ width: "85%", margin: "3rem auto" }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    

                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {reportedPropertyDetails ? reportedPropertyDetails.length > 0 ? reportedPropertyDetails.map((reportedDetail) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                    <Card sx={{ maxWidth: 345 }} onClick={() => handleClick(reportedDetail.id)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={reportedDetail.image}
                                            alt="property image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                                {reportedDetail.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                                {reportedDetail.location}
                                            </Typography>
                                            <br />
                                            <Typography variant="body1" color="text.secondary">
                                                ${reportedDetail.price}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )

                            ) : "There are no properties reported in the application :)" : " Fetching properties"}

                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default ViewAdminPage