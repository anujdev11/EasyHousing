// Author: Pankti Vyas (B00886309)

import React from "react";

import ListServices from "../../features/services/ListServices/ListServices";
import Navbar from "../NavigationBar/Navbar";
import Footer from "../../features/ui/Footer/Footer";

import "./AllServices.css";

const AllServices = () => {
  return (
    <>
      <Navbar />
      <div className="all-services wrapper">
        <h1>All Services</h1>

        <ListServices />
      </div>
      <Footer />
    </>
  )
};

export default AllServices;