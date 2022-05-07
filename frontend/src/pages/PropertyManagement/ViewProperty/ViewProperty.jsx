// Author: Purvilkumar Bharthania (B00901605)

import React, { useEffect, useState } from 'react'
import NavigationBar from "../../NavigationBar/Navbar";
import { Container, Box, CssBaseline, TextField, Grid } from '@mui/material';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import axios_api from '../../../common/axios';
import { useNavigate } from 'react-router';

const initialState = {
    filter: 'city',
    value1: '',
    value2: '',
};

const ViewProperty = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState(initialState);
    const [properties, setProperties] = useState(null)

    useEffect(async () => {
        await axios_api.get("/properties/getAllPropeties")
            .then(response => {
                if (response.data.success) {
                    setProperties(response.data.data);
                }

            }).catch((err) => {
                setProperties([])
            })
    }, [])

    const handleSearchChange = async (e) => {
        const value = e.target.value
        const post = { ...searchText, value1: value };

        setSearchText(post)
        axios_api.post("/properties/getFilterProperties", post)
            .then((response) => {
                if ((response.data.success = true)) {
                    setProperties(response.data.data);

                } else {
                    //toast.error(response?.data?.message);
                }
            })
            .catch((err) => {
                setProperties([])
                console.log(err?.response?.data?.message);
                //toast.error(err?.response?.data?.message || "Something went wrong");
            });
    }

    const handleClick = (propertyId) => {
        navigate(`/propertyDetails/${propertyId}`);
    };


    return (
        <>
            <NavigationBar />
            <Container component="main" maxWidth='xl' >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <TextField
                        name="search"
                        fullWidth
                        id="search"
                        label="Search City ..."
                        autoFocus
                        value={searchText.value1}
                        onChange={handleSearchChange}
                    />

                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {properties ? properties.length > 0 ? properties.map((property) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                    <Card sx={{ maxWidth: 345 }} onClick={() => handleClick(property.id)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={property.image}
                                            alt="property image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                                {property.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                                {property.location}
                                            </Typography>
                                            <br />
                                            <Typography variant="body1" color="text.secondary">
                                                ${property.price}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )

                            ) : "No results Found" : " Fetching properties"}

                        </Grid>
                    </Box>
                </Box>
            </Container>

        </>
    )
}

export default ViewProperty