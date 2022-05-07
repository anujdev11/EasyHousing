//Author: Lins George (B00895654)

import React, { useState, form, Fragment, useEffect, useContext } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Tabs, Tab, CardContent, Grid } from "@material-ui/core";
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import Card from '@mui/material/Card';
import { CardActions, CardMedia, TextField, ImageListItem, ImageList, Alert } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import axios_api from "../../common/axios";
import sampleImage from "../../assets/images/Sample.jpg"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardDisplay from "./CardDisplay";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/userContext";
import * as ActionTypes from "../../common/actionTypes";
import NavigationBar from "../NavigationBar/Navbar";
import { ROUTES } from "../../common/constants";
import { toast } from "react-toastify";

export default function MyListings() {
    const {
        state: { authenticated, currentUser, listings },
        dispatch,
    } = useContext(AppContext);
    
    console.log(listings);

    let navigate = useNavigate();
    useEffect(() => {
        if (!authenticated) {
            navigate(ROUTES.LOGIN);
        }
        axios_api
            .get(`/roomatefinder/${currentUser.user_id}`)
            .then((response) => {
                console.log(response );
                if ((response.data.success = true)) {
                    dispatch({ type: ActionTypes.SET_ROOMMATE_LISTINGS, data: response.data });

                } else {
                     toast.error(response?.data?.message);
                }
            });
    });
    return (
        <Fragment>
            <NavigationBar />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Typography textAlign="center" variant="h6" component="h6">
                    My listings
                </Typography>
            </div>
            <div style={{ display: 'flex', flexGrow: 1, marginLeft: '10%', marginRight: '10%', marginTop: '5%', marginBottom: '5%' }}>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    display='flex'
                    flexGrow='1'
                >
                    

                    {listings &&  listings.map((listing) => (
                        <Grid item xs={12} sm={4}>
                            <CardDisplay listing={listing} isMyListing={true} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Fragment>
    );
}
