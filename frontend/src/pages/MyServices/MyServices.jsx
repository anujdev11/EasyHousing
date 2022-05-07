// Author: Pankti Vyas (B00886309)

import React from "react";

import ListServices from "../../features/services/ListServices/ListServices";
import Navbar from "../NavigationBar/Navbar";
import Footer from "../../features/ui/Footer/Footer";

const MyServices = () => {

  return (
    <>
      <Navbar />
      <div className="all-services wrapper">
        <h1>My Services</h1>

        <ListServices myservices />
      </div>
      <Footer />
    </>
  )
};

export default MyServices;
