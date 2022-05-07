// Author: Anuj Dev (B00900887)

import React, { useContext, useEffect } from "react";
import MainScreen from "../../../assets/images/Signup.jpg";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/userContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";
import axios_api from "../../../common/axios";
import { ROUTES } from "../../../common/constants";

const Signup = () => {
  const {
    state: { authenticated },
  } = useContext(AppContext);
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    watch,
  } = useForm();

  useEffect(() => {
    if (authenticated) {
      // toast.info("You are already Authenticated");
      navigate(ROUTES.HOMEPAGE);
    }
  }, [authenticated]);
  const onSubmit = (data) => {
    const { firstName, lastName, email, password, confirmPassword } = data;
    const registrationDetails = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };
    axios_api
      .post("/users/appUserRegistration", registrationDetails)
      .then((response) => {
        if ((response.data.success = true)) {
          toast.success(response?.data?.message);
          reset();
          navigate(ROUTES.LOGIN);
        } else {
          toast.error(response?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Something went wrong");
      });
  };

  const password = watch("password");

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${MainScreen})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          sx={{ height: "100%", overflowY: "auto" }}
        >
          <Button
            sx={{
              my: 4,
              ml: 2,
              alignItems: "left",
            }}
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
            onClick={() => navigate(ROUTES.HOMEPAGE)}
          >
            Home
          </Button>
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <AppRegistrationIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
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
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message:
                      "Please enter valid email address, Example (email_id@provider.com)",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <Typography component="subtitle2" sx={{ color: "red" }}>
                  {errors.email.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is Required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Please enter valid password, Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                  },
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && (
                <Typography component="subtitle2" sx={{ color: "red" }}>
                  {errors.password.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is Required",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                onKeyUp={() => {
                  trigger("confirmPassword");
                }}
              />
              {errors.confirmPassword && (
                <Typography component="subtitle2" sx={{ color: "red" }}>
                  {errors.confirmPassword.message}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    onClick={(event) => navigate(ROUTES.LOGIN)}
                    variant="body2"
                  >
                    {"Already Have Account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
