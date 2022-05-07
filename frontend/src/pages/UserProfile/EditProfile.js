// Author: Anuj Dev (B00900887)
import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import AccountProfile from "../../Components/profile/AccountProfile";
import { AccountProfileDetails } from "../../Components/profile/AccountProfileDetails";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ROUTES } from "../../common/constants";
import Navbar from "../NavigationBar/Navbar";
import { AppContext } from "../../context/userContext";
import { toast } from "react-toastify";

const EditUserProfile = () => {
  const {
    state: { authenticated, authToken },
  } = useContext(AppContext);
  let navigate = useNavigate();
  const [fileData, setFileData] = useState();
  useEffect(() => {
    if (!authenticated) {
      navigate(ROUTES.HOMEPAGE);
    }
  }, [authenticated]);
  return (
    <div>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          backgroundColor: "#F9FAFC",
        }}
      >
        <Container maxWidth="lg">
          <Button
            sx={{
              mb: 2,
              alignItems: "left",
            }}
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
            onClick={() => navigate(ROUTES.USERS_PROPERTY)}
          >
            Back to Profile
          </Button>
          <Typography sx={{ mb: 2 }} variant="h4">
            Edit Profile
          </Typography>

          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile fileData={fileData} setFileData={setFileData} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails
                fileData={fileData}
                setFileData={setFileData}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      );
    </div>
  );
};

export default EditUserProfile;
