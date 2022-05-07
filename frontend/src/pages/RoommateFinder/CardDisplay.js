//Author: Lins George (B00895654)

import React, { useState, form, Fragment, useEffect,useContext } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Tabs, Tab, CardContent, Grid, Box } from "@material-ui/core";
import Card from '@mui/material/Card';
import { CardActions, CardMedia, TextField, ImageListItem, ImageList, Alert } from "@mui/material";
import Modal from '@mui/material/Modal';
import sampleImage from "../../assets/images/Sample.jpg"
import placeholder from "../../assets/images/placeholder.png"
import axios_api from "../../common/axios";
import { ROUTES } from "../../common/constants";
import { AppContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import * as ActionTypes from "../../common/actionTypes";
import { toast } from "react-toastify";

export default function CardDisplay(props) {
    
   const {
    state: { authenticated, currentUser , listings},
    dispatch,
  } = useContext(AppContext);

    const { listing, isMyListing } = props;
   
    const [modalOpen, setModalOpen] = useState(false);
    let navigate = useNavigate();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const deleteListing = () => {
       
        if (window.confirm('Are you sure you wish to delete this item?')) {
            axios_api
                .delete(`/roomatefinder/${listing.id}`)
                .then((response) => {
                    
                    if ((response.data.success = true)) {
                        
                    } else {
                        toast.error(response?.data?.message);
                    }
                });
        }

    }

    const editListing = () => {
        
            axios_api.get(`/roomatefinder/ListingById/${listing.id}`)
                .then((response) => {
                   
                    if ((response.data.success = true)) {
                        dispatch({ type: ActionTypes.SET_EDIT_LISTING_DETAILS, data: response.data });
                         navigate(ROUTES.ROOMMATE_FINDER_EDIT_LISTINGS , {
                             isEditPage: true
                         });
                    } else {
                        toast.error(response?.data?.message);
                    }
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message || "Something went wrong");
                 });

    }



    const moveDate = listing.moveInDate;
    const trimMoveDate = moveDate.substring(0,10);
    return (
        <Fragment>
            <Card sx={{ minWidth: '20%' }}>
                <CardMedia
                    component="img"
                    height="140"
                    width="100%"
                   src={listing.imageUrl ? listing.imageUrl : placeholder}
                    //src={placeholder}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {listing.title}
                        {/* Room available in Halifax */}
                    </Typography>

                    <Typography variant="subtitle2" component="div">
                        Posted By: {listing.postedBy} | {listing.location}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        Available: {trimMoveDate}
                    </Typography>
                    <Typography variant="body2">
                        {listing.description}
                        <br />
                    </Typography>
                </CardContent>
                {isMyListing ? (
                    <CardActions>
                        <Button size="small" onClick={deleteListing}>Delete Listing</Button>
                        <Button size="small" onClick={()=>{
                            editListing()}}>Edit Listing</Button>

                    </CardActions>
                ) : (
                    <CardActions>
                        {
                            <Button size="small" onClick={() => {
                                setModalOpen(true);
                            }}>See More</Button>

                        }
                    </CardActions>
                )}

            </Card>

            <Modal
                open={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Card sx={{ minWidth: '20%' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            width="100%"
                            src={placeholder}

                        />
                        <CardContent>

                            <Typography variant="h6" component="div">
                                {listing.title}
                                {/* Room available in Halifax */}
                            </Typography>

                            <Typography variant="subtitle2" component="div">
                                Posted By: {listing.postedBy} | {listing.location}
                            </Typography>
                            <Typography variant="subtitle2" component="div">
                                Available: {listing.moveInDate}
                            </Typography>
                            <Typography variant="body2">
                                {listing.description}
                                <br />
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Modal>
        </Fragment>
    );
}
