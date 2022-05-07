// Arvinder Singh (B00878415)

import React, {useState} from "react";
import axios_api from "../../common/axios";
import {Card, CardContent, Dialog, DialogTitle, IconButton, Grid, Button, Rating} from "@mui/material";
import {CloseOutlined} from "@material-ui/icons";
import {toast} from "react-toastify";

function ShowReviews(props) {
    const [ reviews, setReviews ] = useState([]);
    const [ avgRating, setAvgRating ] = useState(-1);
    const [ openDialog, setOpenDialog ] = useState(false);

    const showReviews = () => {
        axios_api.get(`/ratings/getAvgPropertyRatings/${props.propertyId}`).then((res) => {
            if (res.data.success) {
                setAvgRating(res.data.averageRating);
            }
        }).catch((err) => {
            if (err.response && err.response.status === 404) {
                setAvgRating(-1);
            }
        })

        axios_api.get(`/reviews/getAllPropertyReviews/${props.propertyId}`).then((res) => {
            if (res.data.success) {
                setReviews(res.data.reviews);
                setOpenDialog(true);
            }
        }).catch((err) => {
            if (err.response && err.response.status === 404) {
                setReviews([]);
                setOpenDialog(true);
            } else {
                toast.error("Something went wrong");
            }
        })
    }

    const handleClose = () => {
        setOpenDialog(false);
    }

    return (
        <div className={"show-reviews"}>
            <Button
                variant="contained"
                onClick={showReviews}
                color="warning"
                sx={{ mt: 3, mb: 2, mr: 2 }}
            >
                Show Reviews
            </Button>
            <Dialog open={openDialog} fullWidth={true}>
                <DialogTitle>
                    <div style={{float: "left"}}>
                        Property Rating and Reviews
                    </div>
                    <div style={{float: "right"}}>
                        <IconButton onClick={handleClose}>
                            <CloseOutlined/>
                        </IconButton>
                    </div>
                </DialogTitle>
                {avgRating !== -1 ? (
                    <p style={{marginLeft: "22px"}}><Rating precision={0.1} value={avgRating} readOnly={true}/></p>
                ) : (
                    <p style={{marginLeft: "22px"}}>No Rating provided yet!!!</p>
                )}
                {reviews.length < 1 ? (
                    <p style={{marginLeft: "22px", marginBottom: "20px"}}>No review posted for this property yet!!!</p>
                ) : (
                    <div>
                        {reviews.map(value => (
                            <Grid key={value.review_id} style={{margin: "5%"}}>
                                <Card raised={true}>
                                    <CardContent>
                                        <p>{value.review}</p>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </div>
                )}
            </Dialog>
        </div>
    )
}

export default ShowReviews;