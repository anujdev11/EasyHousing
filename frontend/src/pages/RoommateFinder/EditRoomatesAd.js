//Author: Lins George (B00895654)

import React, { useState, form, Fragment, useEffect, useContext } from "react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  CardContent,
  Grid,
} from "@material-ui/core";
import Card from "@mui/material/Card";
import { TextField, ImageListItem, ImageList, Alert } from "@mui/material";
import { toast } from "react-toastify";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import axios_api from "../../common/axios";
import { AppContext } from "../../context/userContext";
import { useForm } from "react-hook-form";
import NavigationBar from "../NavigationBar/Navbar";
import { ROUTES } from "../../common/constants";
import { useNavigate } from "react-router-dom";

export default function PostRoomatesAd() {
  const [selectedFiles, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [previewImages, setImages] = useState([]);
  const [title, setTitle] = useState(null);
  const [Location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);
  const [alert, setAlert] = useState(null);
  const [moveInDate, setMoveInDate] = useState(null);

  const {
    state: { authenticated, currentUser, editItem },
    dispatch,
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    //formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();

  const intialDetails = {
    title: editItem.title,
    location: editItem.location,
    description: editItem.description,
    //phoneNumber: editItem.phoneNumber,
  };

  const handleImageUpload = (event) => {
    let images = [];
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setImages(images);
  };

  const onSubmitForm = (data) => {
    axios_api
      .put(`/roomatefinder/${editItem.id}`, data)
      .then((response) => {
        if ((response.data.success = true)) {
          toast.success(response?.data?.message);
          navigate(ROUTES.ROOMMATE_FINDER_MY_LISTINGS);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  let navigate = useNavigate();
  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, []);

  const today = new Date();
  const [startDate, setStartDate] = useState(today);

  return (
    <Fragment>
      <NavigationBar />
      {/* {alert && <Alert variant="outlined" severity="success">Post submitted successfully!</Alert>} */}
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          marginLeft: "10%",
          justifyContent: "space-between",
          marginRight: "10%",
          marginTop: "5%",
          marginBottom: "5%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div
            style={{
              marginBottom: "2%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {previewImages && previewImages.length > 0 && (
              <ImageList
                sx={{ width: "80%", height: "100%" }}
                cols={2}
                rowHeight={200}
              >
                {previewImages.map((img, i) => (
                  <ImageListItem key={i}>
                    <img
                      className="preview"
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        float: "left",
                        backgroundSize: "cover",
                      }}
                      src={img}
                      alt={"image-" + i}
                      key={i}
                    />
                    ;
                  </ImageListItem>
                ))}
              </ImageList>
            )}
            <Button variant="outlined" component="h6">
              Upload Image
              <input
                type={"file"}
                multiple
                onChange={handleImageUpload}
                accept="image/*"
              />
            </Button>
          </div>
          <Typography component="h6" variant="h6">
            Enter the title of your Ad
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            defaultValue={intialDetails.title}
            label="Ad Title"
            name="title"
            {...register("title", {
              required: "Title is Required",
              // pattern: {
              //   value: /^[a-zA-Z ]*$/,
              //   message: "Please enter alphabet characters only",
              // },
            })}
            onKeyUp={() => {
              trigger("title");
            }}
            // onChange={(e) => { setTitle(e.target.value) }}
          />
          <Typography component="h6" variant="h6">
            Location
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            defaultValue={intialDetails.location}
            id="location"
            label="location"
            name="location"
            {...register(
              "location"
              // pattern: {
              //   value: /^[a-zA-Z ]*$/,
              //   message: "Please enter alphabet characters only",
              // },
            )}
            onKeyUp={() => {
              trigger("location");
            }}
            //value={editItem.location}
            //onChange={(e) => { setLocation(e.target.value) }}
          />

          <Typography component="h6" variant="h6">
            Move in Date
          </Typography>
          <div style={{ marginTop: "2.5%", marginBottom: "2.5%" }}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DatePicker
                label="Choose a Date"
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                id="moveInDate"
                name="moveInDate"
                {...register(
                  "moveInDate"
                  // pattern: {
                  //   value: /^[a-zA-Z ]*$/,
                  //   message: "Please enter alphabet characters only",
                  // },
                )}
                onKeyUp={() => {
                  trigger("moveInDate");
                }}
                minDate={today}
                required
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <Typography
            sx={{ backgroundColor: "yellow" }}
            component="h6"
            variant="h6"
          >
            Give a short description about the room and surroundings
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            defaultValue={intialDetails.description}
            name="description"
            label="Description"
            type="text"
            id="description"
            maxRows={4}
            {...register(
              "description"
              // pattern: {
              //   value: /^[a-zA-Z ]*$/,
              //   message: "Please enter alphabet characters only",
              // },
            )}
            onKeyUp={() => {
              trigger("description");
            }}

            //onChange={(e) => { setDescription(e.target.value) }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Ad
          </Button>
        </form>
      </div>
    </Fragment>
  );
}
