import React, { useState, useContext } from "react";
import NavigationBar from "../NavigationBar/Navbar";
import { AppContext } from "../../context/userContext";
import ImageSection from "./components/ImageSection";
import PropertiesHomePage from "./components/PropertiesHomePage";
import Footer from "../Footer/Footer";

const HomePage = () => {
  const {
    state: { authenticated, currentUser, userId, authToken },
    dispatch,
  } = useContext(AppContext);
  return (
    <>
      <NavigationBar />
      <ImageSection />
      <PropertiesHomePage />
      <Footer />
    </>
  );
};

export default HomePage;
