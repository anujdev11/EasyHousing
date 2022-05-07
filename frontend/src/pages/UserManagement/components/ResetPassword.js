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
import { useNavigate, useParams } from "react-router-dom";
import axios_api from "../../../common/axios";
import { AppContext } from "../../../context/userContext";
import { ROUTES } from "../../../common/constants";

const ResetPassword = () => {
  const urlParams = useParams();
  const { jwtToken, userId } = urlParams;
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
    const { newPassword, confirmNewPassword } = data;
    const resetPasswordDetails = {
      newPassword,
      confirmNewPassword,
    };
    axios_api
      .post(`users/passwordReset/${userId}/${jwtToken}`, resetPasswordDetails)
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

  const password = watch("newPassword");

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
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    autoComplete="current-password"
                    {...register("newPassword", {
                      required: "New Password is Required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                        message:
                          "Please enter valid password, Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("newPassword");
                    }}
                  />
                  {errors.newPassword && (
                    <Typography sx={{ color: "red" }}>
                      {errors.newPassword.message}
                    </Typography>
                  )}
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                    id="confirmNewPassword"
                    {...register("confirmNewPassword", {
                      required: "Confirm Password is Required",
                      validate: (value) =>
                        value === password || "The passwords do not match",
                    })}
                    onKeyUp={() => {
                      trigger("confirmNewPassword");
                    }}
                  />
                  {errors.confirmNewPassword && (
                    <Typography sx={{ color: "red" }}>
                      {errors.confirmNewPassword.message}
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
