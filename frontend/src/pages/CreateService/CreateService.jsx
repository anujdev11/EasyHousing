// Author: Pankti Vyas (B00886309)

import React from "react";
import ServiceForm from "../../features/services/ServiceForm/ServiceForm";
import Navbar from "../NavigationBar/Navbar";
import Footer from "../../features/ui/Footer/Footer";

const CreateService = () => {
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <ServiceForm />
      </div>
      <Footer />
    </>
  )
};

export default CreateService;