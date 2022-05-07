import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import Navbar from "../../NavigationBar/Navbar";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios_api from "../../../common/axios";
import { AppContext } from "../../../context/userContext";
import { ROUTES } from "../../../common/constants";

const ResetPassword = () => {
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
      navigate(ROUTES.HOMEPAGE);
    }
  }, [authenticated]);
  const onSubmit = (data) => {
    const { email } = data;
    const forgetPasswordDetails = {
      email,
    };
    axios_api
      .post("/users/forgetPassword", forgetPasswordDetails)
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

  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            backgroundColor: "#F9FAFC",
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              Password Settings
            </Typography>
            <Box sx={{ pt: 3 }}>
              <Card>
                <CardHeader
                  subheader="Forget Password"
                  title="Reset Password"
                />
                <Divider />
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    mt: 1,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      p: 2,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Container>
        </Box>
      </Grid>
    </>
  );
};

export default ResetPassword;
