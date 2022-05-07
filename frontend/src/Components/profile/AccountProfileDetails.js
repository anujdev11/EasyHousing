// Author: Anuj Dev (B00900887)

import React, { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import { AppContext } from "../../context/userContext";
import { ROUTES } from "../../common/constants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios_api from "../../common/axios";

export const AccountProfileDetails = (props) => {
  const {
    state: { authenticated, currentUser, authToken },
  } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();
  const intialValues = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
  };
  let navigate = useNavigate();
  const onSubmit = (data) => {
    let path = "";
    const imageData = new FormData();
    imageData.append("image", props.fileData);
    if (props.fileData) {
      axios_api
        .post("/properties/uploadImage", imageData)
        .then((response) => {
          path = response.data;
          const { firstName, lastName, phoneNumber } = data;
          const updateDetails = {
            firstName,
            lastName,
            phoneNumber,
            imgURL: path,
          };
          const config = {
            headers: { Authorization: `${authToken}` },
          };
          axios_api
            .put(
              `/users/updateProfile/${currentUser.user_id}`,
              updateDetails,
              config
            )
            .then((response) => {
              if ((response.data.success = true)) {
                toast.success(response?.data?.message);
                reset();
                navigate(ROUTES.USERS_PROPERTY);
              } else {
                toast.error(response?.data?.message);
              }
            })
            .catch((err) => {
              toast.error(
                err?.response?.data?.message || "Something went wrong"
              );
            });
        })
        .catch((err) => {
          console.log(err?.response?.data?.message);
        });
    } else {
      const { firstName, lastName, phoneNumber } = data;
      const updateDetails = {
        firstName,
        lastName,
        phoneNumber,
      };
      const config = {
        headers: { Authorization: `${authToken}` },
      };
      axios_api
        .put(
          `/users/updateProfile/${currentUser.user_id}`,
          updateDetails,
          config
        )
        .then((response) => {
          if ((response.data.success = true)) {
            toast.success(response?.data?.message);
            reset();
            navigate(ROUTES.PROFILE);
          } else {
            toast.error(response?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || "Something went wrong");
        });
    }
  };

  return (
    <Card>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                defaultValue={intialValues.firstName}
                fullWidth
                label="First name"
                name="firstName"
                id="firstName"
                required
                variant="outlined"
                autoComplete="firstName"
                autoFocus
                {...register("firstName", {
                  required: "First Name is Required",
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Please enter alphabet characters only",
                  },
                })}
                onKeyUp={() => {
                  trigger("firstName");
                }}
              />
              {errors.firstName && (
                <Typography component="subtitle2" sx={{ color: "red" }}>
                  {errors.firstName.message}
                </Typography>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                defaultValue={intialValues.lastName}
                fullWidth
                label="Last name"
                name="lastName"
                required
                variant="outlined"
                autoComplete="lastName"
                {...register("lastName", {
                  required: "Last Name is Required",
                  pattern: {
                    value: /^[a-zA-Z ]*$/,
                    message: "Please enter alphabet characters only",
                  },
                })}
                onKeyUp={() => {
                  trigger("lastName");
                }}
              />
              {errors.lastName && (
                <Typography component="subtitle2" sx={{ color: "red" }}>
                  {errors.lastName.message}
                </Typography>
              )}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                defaultValue={intialValues.email}
                disabled
                fullWidth
                label="Email Address"
                name="email"
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label="Password"
                name="password"
                required
                type={"password"}
                variant="outlined"
              />
              <Box sx={{ ml: 1, mt: 1 }}>
                <Link
                  onClick={(event) => navigate(ROUTES.CHANGEPASSWORD)}
                  variant="body2"
                >
                  {"Change Password?"}
                </Link>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                defaultValue={intialValues.phoneNumber}
                fullWidth
                label="Phone Number"
                name="phone"
                variant="outlined"
                {...register("phoneNumber", {
                  pattern: {
                    value:
                      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                    message: "Please enter Phone Number in Proper Format",
                  },
                })}
                onKeyUp={() => {
                  trigger("phoneNumber");
                }}
              />
              {errors.phoneNumber && (
                <Typography component="subtitle2" sx={{ color: "red" }}>
                  {errors.phoneNumber.message}
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit">
            Update details
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
