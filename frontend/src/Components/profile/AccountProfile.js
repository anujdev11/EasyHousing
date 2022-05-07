// Author: Anuj Dev (B00900887)

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Input,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/userContext";

const AccountProfile = (props) => {
  const {
    state: { authenticated, currentUser },
  } = useContext(AppContext);
  const [fileName, setFileName] = useState();

  const handleUpload = async (e) => {
    let imageData = e.target.files[0];
    setFileName(imageData.name);
    props.setFileData(imageData);
  };
  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={currentUser.imgURL}
              sx={{
                height: 100,
                mb: 2,
                width: 100,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {currentUser.firstName + " " + currentUser.lastName}
            </Typography>
          </Box>
        </CardContent>
        <Divider />

        <CardActions>
          <label htmlFor="contained-button-file">
            <Box sx={{ display: "flex" }}>
              <Input
                sx={{ display: "none" }}
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={handleUpload}
              />
              <Button
                component="span"
                color="primary"
                fullWidth
                variant="text"
                startIcon={<CameraAltIcon />}
              >
                Upload picture
              </Button>
              <Typography
                component="span"
                sx={{ mt: 1 }}
                textOverflow="ellipsis"
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {fileName ? fileName : ""}
              </Typography>
            </Box>
          </label>
        </CardActions>
      </Card>
    </>
  );
};

export default AccountProfile;
