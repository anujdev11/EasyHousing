// Author: Viren Babubhai Malavia (B00895669)

import React, { useEffect, useState, useContext } from 'react'
import NavigationBar from "../../NavigationBar/Navbar";
import { Container, Box, CssBaseline, TextField, Grid } from '@mui/material';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import axios_api from '../../../common/axios';
import { useNavigate } from 'react-router';
import { AppContext } from "../../../context/userContext";
import FavoritesHeading from "../../../Components/Favorites/FavoritesHeading";

const initialState = {
    filter: 'city',
    value1: '',
    value2: '',
};

const ViewFavorites = () => {
    const {
        state: { authenticated, userId, currentUser },
    } = useContext(AppContext);

    const userID = userId;

    const navigate = useNavigate();

    const [favoritesDetails, setFavoritesDetails] = useState([]);
    
    const favPropDetails = (data) => {
        data.map((favoriteData) => (
            axios_api.get(`/properties/getProperty/${favoriteData.property_id}`).then((res) => {
                if(res.data.success){
                    setFavoritesDetails(prev => ([...prev, res.data.data]));
                };   
            })
        ))
    }

    useEffect( () => {
        axios_api.get(`/favorites/${userID}`).then((res) => {
            if(res.data.success){
                favPropDetails(res.data.favorites);
            }
        });
    }, [])

    const handleClick = (propertyId) => {
        // navigate(`/view_favorites_details/${propertyId}`);
        navigate(`/propertyDetails/${propertyId}`);
    };

    return (
        <>
            <NavigationBar />
            <FavoritesHeading heading="My Favorites" />
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
                            {favoritesDetails ? favoritesDetails.length > 0 ? favoritesDetails.map((favoritesDetail) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                    <Card sx={{ maxWidth: 345 }} onClick={() => handleClick(favoritesDetail.id)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={favoritesDetail.image}
                                            alt="property image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                                {favoritesDetail.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                                {favoritesDetail.location}
                                            </Typography>
                                            <br />
                                            <Typography variant="body1" color="text.secondary">
                                                ${favoritesDetail.price}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )

                            ) : "You do not have any Favorites! Now is the time to add some ;)" : " Fetching properties"}

                        </Grid>
                    </Box>
                </Box>
            </Container>

        </>
    )
}

export default ViewFavorites