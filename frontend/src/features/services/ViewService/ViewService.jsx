// Author: Pankti Vyas (B00886309)

import React from "react";

import { Paper, Grid, Container } from "@material-ui/core";
import Axios from "axios";
import Loader from "../../ui/Loader/Loader";
import { Button, Divider, SvgIcon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CenterFocusStrong, LocationOnOutlined } from "@material-ui/icons";
import axios_api from "../../../common/axios";

const ViewService = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [service, setService] = React.useState({});

  React.useEffect(() => {
    axios_api.get(`/services/${props.id}`)
      .then((response) => {
        if (response.status === 200) {
          setService(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }, [])

  return (
    <Paper style={{ margin: "64px auto", width: "70%", fontFamily: "sans-serif", overflow: "hidden" }} elevation={5}>
      <Loader show={isLoading} />
      {isLoading ? (
        <div style={{minHeight: "70vh"}}>
        </div>
      ) : (<Container component="main" maxWidth="md" style={{ display: "flex", flexFlow: "column" }}>
        <div style={{
          width: "calc(100% + 48px)",
          margin: "0 -24px",
          height: "400px",
          overflow: "hidden"
        }}>
          <img src={service.image} style={{
            objectFit: "cover",
            objectPosition: "center",
            width: "100%",
            height: "100%"
          }} />
        </div>

        <Typography gutterBottom marginTop="32px" variant="h3" component={"div"}>
          {service.title}
        </Typography>

        <Typography gutterBottom variant="h5" component="p">
          {service.description}
        </Typography>

        <div style={{
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          marginBottom: "16px"
        }}>
          <SvgIcon component={LocationOnOutlined} />
          <Typography color="#444" variant="h6" component="span">{service.location}</Typography>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "bold",
          color: "darkgreen",
          marginBottom: "32px"
        }}>
          <p>${service.price}</p>
        </div>

        <Button color="primary" variant="outlined" href={`mailto:${service.email}`} style={{
          marginBottom: "32px"
        }}>
          Contact at {service.email}
        </Button>
      </Container>)}
    </Paper>
  )
};

export default ViewService;
