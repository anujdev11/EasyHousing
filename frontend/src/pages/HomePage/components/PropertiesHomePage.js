// Author: Anuj Dev (B00900887)

import * as React from "react";
import { Box, Typography, Container, ButtonBase } from "@mui/material";

export default function PropertiesHomePage() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        Featured Rental Properties
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}></Box>
    </Container>
  );
}
