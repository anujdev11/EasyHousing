import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mr: 1,
  color: "white",
};

const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mr: 1,
  color: "white",
};

export default function AppFooter() {
  return (
    <Typography component="footer" sx={{ display: "flex", bgcolor: "#274596" }}>
      <Container sx={{ my: 8, display: "flex", flexDirection: "column" }}>
        <Grid container direction="column" justifyContent="flex-end">
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={pageStyle}>EasyHousing Inc.© 2022</Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          spacing={6}
        >
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="a" href="#" sx={pageStyle}>
              About Us
            </Box>
            <Box component="a" href="#" sx={pageStyle}>
              Terms of Use
            </Box>
            <Box component="a" href="#" sx={pageStyle}>
              Contact Us
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          spacing={2}
        >
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Box component="a" href="#" sx={iconStyle}>
              <FacebookIcon />
            </Box>
            <Box component="a" href="#" sx={iconStyle}>
              <TwitterIcon />
            </Box>
            <Box component="a" href="#" sx={iconStyle}>
              <InstagramIcon />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
