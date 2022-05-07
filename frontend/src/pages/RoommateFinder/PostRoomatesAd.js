//Author: Lins George (B00895654)

import React, { useState, form, Fragment, useEffect, useContext } from "react";
import { AppBar, Button, IconButton, Toolbar, Typography, Tabs, Tab, CardContent, Grid } from "@material-ui/core";
import Card from '@mui/material/Card';
import { TextField, ImageListItem, ImageList, Alert } from "@mui/material";
import { toast } from "react-toastify";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import axios_api from "../../common/axios";
import { AppContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../common/constants";

export default function PostRoomatesAd(props) {
    const [selectedFiles, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [previewImages, setImages] = useState([]);
    const [title, setTitle] = useState(null);
    const [Location, setLocation] = useState(null);
    const [description, setDescription] = useState(null);
    const [alert, setAlert] = useState(null);

    const {
        state: { authenticated, currentUser },
        dispatch,
    } = useContext(AppContext);


    const handleImageUpload = (event) => {
        let images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]))
        }
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name)
        setImages(images);
    }

    const onSubmitForm = (e) => {
        
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", selectedFiles);
        // formData.append("fileName", fileName)
console.log(currentUser);
        if (selectedFiles) {
            axios_api
                .post("/roomatefinder/imageUpload", formData)
                .then((response) => {
                    const path = response.data;
                    const listingDetails = {
                        title: title,
                        imageUrl: path,
                        description: description,
                        location: Location,
                        moveInDate: startDate,
                        postedBy: currentUser.firstName,
                        postedUserId: currentUser.user_id
                    }

                    axios_api
                        .post("/roomatefinder/", listingDetails)
                        .then((response) => {
                            if ((response.data.success = true)) {
                                toast.success(response?.data?.message);
                                // reset();
                                props.setValue("list")
                                 navigate(ROUTES.ROOMMATE_FINDER);
                            } else {
                                toast.error(response?.data?.message);
                            }
                        })
                        .catch((err) => {

                            toast.error(err?.response?.data?.message || "Something went wrong");
                        });


                    setAlert(true);
                })
        }


    }
 

    let navigate = useNavigate();
    useEffect(() => {
        if (!authenticated) {
            navigate(ROUTES.LOGIN);
        }
    }, []);
    const today = new Date();
    const [startDate, setStartDate] = useState(today);

    return (

        <Fragment>
            {/* {alert && <Alert variant="outlined" severity="success">Post submitted successfully!</Alert>} */}
            <div style={{ display: 'flex', flexGrow: 1, marginLeft: '10%', justifyContent: 'space-between', marginRight: '10%', marginTop: '5%', marginBottom: '5%', justifyContent: 'center', alignItems: 'center' }}>

                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitForm}>
                    <div style={{ marginBottom: '2%', display: 'flex', flexDirection: 'column' }}>
                        {previewImages && previewImages.length > 0 && (
                            <ImageList sx={{ width: '80%', height: '100%' }} cols={2} rowHeight={200}>
                                {previewImages.map((img, i) => (
                                    <ImageListItem key={i}>
                                        <img className="preview"
                                            loading="lazy"
                                            style={{ width: '100%', height: '100%', float: 'left', backgroundSize: 'cover' }}
                                            src={img}
                                            alt={"image-" + i} key={i} />;
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        )}

                        <Button
                            variant="outlined"
                            component="h6"
                        >
                            Upload Image
                            <input type={"file"} name="image" multiple onChange={handleImageUpload} accept="image/*" />
                        </Button>
                    </div>
                    <Typography component="h6" variant="h6" >
                        Enter the title of your Ad
                    </Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Ad Title"
                        name="email"
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    <Typography component="h6" variant="h6" >
                        Location
                    </Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        label="location"
                        name="Location"
                        onChange={(e) => { setLocation(e.target.value) }}
                    />

                    <Typography component="h6" variant="h6">
                        Move in Date
                    </Typography>
                    <div style={{ marginTop: '2.5%', marginBottom: '2.5%' }}>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="Choose a Date"
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                minDate={today}
                                required
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <Typography sx={{ backgroundColor: 'yellow' }} component="h6" variant="h6">
                        Give a short description about the room and surroundings
                    </Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        type="text"
                        id="description"
                        maxRows={4}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}

                    >
                        Post Ad
                    </Button>

                </form>
            </div>
        </Fragment>
    );
}
