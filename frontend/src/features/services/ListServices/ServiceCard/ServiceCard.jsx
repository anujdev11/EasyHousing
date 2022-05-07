// Author: Pankti Vyas (B00886309)

import React from "react";

import { HiOutlinePencil, HiOutlineTrash, HiOutlineLocationMarker } from "react-icons/hi";
import Axios from "axios";

import "./ServiceCard.css";
import { Card, Grid } from "@mui/material";
import Loader from "../../../ui/Loader/Loader";
import axios_api from "../../../../common/axios";

const ServiceCard = ({ id, title, description, img, price, email, location, ...props }) => {

  const [isDeleting, setIsDeleting] = React.useState(false);

  const deleteService = async () => {
    try {
      setIsDeleting(true);
      const response = await axios_api.delete(`/services/${id}`);

      if (response.status === 200) {
        // redirect to /services
        setIsDeleting(false);
        window.location = "/services";
      }
    } catch (error) {
      setIsDeleting(false);
      console.error(error);
    }
  }

  const openEditServicePage = () => {
    window.location = `/services/edit/${id}`;
  }

  const openSingleServicePage = () => {
    window.location = `/services/${id}`
  }

  return (
    <>
    <Loader show={isDeleting} />
    <Grid item xs="4">
      <Card>
      <div className="service-card">
        <div className="service-card-image">
          <img src={img} alt="service card" />
        </div>

        <div className="service-card-details">
          <div className="service-card-title">
            <h2 onClick={openSingleServicePage}>{title}</h2>

            {props.isMyService && (
              <div className="service-card-details-icons">
                <button
                  className="service-card-edit-button"
                  onClick={openEditServicePage}
                >
                  <HiOutlinePencil />
                </button>
                <button
                  className="service-card-delete-button"
                  onClick={deleteService}
                >
                  <HiOutlineTrash />
                </button>
              </div>
            )}
          </div>

          <div className="service-card-location">
            <HiOutlineLocationMarker />

            <span>{location}</span>
          </div>

          <p className="service-card-description">
            {description}
          </p>

          <a
            href={`mailto:${email}`}
            className="service-card-email"
          >{email}</a>

          <p className="service-card-price">C${price}</p>
        </div>
      </div>
      </Card>
    </Grid>
    </>
  )
}

export default ServiceCard;
