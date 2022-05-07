// Author: Pankti Vyas (B00886309)

import React from "react";

import Navbar from "../NavigationBar/Navbar";
import Footer from "../../features/ui/Footer/Footer";
import { useParams } from "react-router-dom";
import ViewService from "../../features/services/ViewService/ViewService";
import { Container } from "@mui/material";

const SingleServicePage = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar />
        <Container>
          <ViewService id={id} />
        </Container>
      <Footer />
    </>
  )
};

export default SingleServicePage;
