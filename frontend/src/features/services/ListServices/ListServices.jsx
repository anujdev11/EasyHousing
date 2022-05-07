// Author: Pankti Vyas (B00886309)

import React, { useState, useEffect, useContext } from "react";

import Axios from "axios";
import ServiceCard from "./ServiceCard/ServiceCard";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { AppContext } from "../../../context/userContext";

import "./ListServices.css";
import Loader from "../../ui/Loader/Loader";
import { Card, Container, Grid, Input, Slider, TextField } from "@mui/material";
import axios_api from "../../../common/axios";

const ListServices = ({ myservices }) => {
  const {
    state: { userId }
  } = useContext(AppContext);

  console.log(userId);

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // input states for filters
  const [titleFilter, setTitleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState([0, 100]);

  const fetchServices = () => {
    const servicesUrl = myservices ? `/services/myservices/${userId}` : "/services"

    axios_api.get(servicesUrl)
      .then((response) => {
        if (response.status === 200) {
          setServices(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      })
  }

  // fetch all services on component mount
  useEffect(() => {
    if (!userId && myservices) {
      window.location = "/login";
    }

    fetchServices();
  }, []);

  const renderServiceList = services.map((service) => {
    return <ServiceCard
      key={service.id}
      id={service.id}
      title={service.title}
      description={service.description}
      img={service.image}
      price={service.price}
      email={service.email}
      location={service.location}
      isMyService={service.userid === userId}
    />
  })

  const priceSliderMarks = [
    {
      value: 0,
      label: "min"
    },
    {
      value: 100,
      label: "max"
    }
  ]

  const handleFilterInputsChange = (event, field) => {
    if (field === "title") {
      const value = event.target.value;
      setTitleFilter(value);
    } else if (field === "location") {
      const value = event.target.value;
      setLocationFilter(value);
    }
  }

  const handleFilterSliderChange = (_, value) => {
    if (value[0] !== value[1]) {
      setPriceFilter(value);
    }
  }

  const fetchServicesBasedOnFilters = () => {
    setIsLoading(true);
    const filterObject = {};

    if (titleFilter.length > 3) {
      filterObject.title = titleFilter;
    }

    if (locationFilter.length > 0) {
      filterObject.location = locationFilter;
    }

    const priceMin = priceFilter[0];
    const priceMax = priceFilter[1];

    if (priceMin !== 0 && priceMax !== 100) {
      filterObject.price = {
        min: priceMin,
        max: priceMax
      }
    } else if (priceMin !== 0 && priceMax === 100) {
      filterObject.price = {
        min: priceMin
      }
    } else if (priceMax !== 0 && priceMin === 0) {
      filterObject.price = {
        max: priceMax
      }
    }

    if (userId && myservices) {
      filterObject.userId = userId;
    }

    axios_api.post("/services/filter", filterObject)
      .then((response) => {
        if (response.status === 200) {
          setServices(response.data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  const shouldFilterCallApi = (event) => {
    if (event.code === "Enter") {
      fetchServicesBasedOnFilters();
    }
  }
  
  return (
    <Container>
      <Grid container spacing={2} style={{ marginBottom: "64px" }}>
        <Grid item xs={4}>
          <TextField
            label="Filter by title"
            value={titleFilter}
            fullWidth
            onChange={(event) => handleFilterInputsChange(event, "title")}
            onKeyDown={shouldFilterCallApi}
            onBlur={fetchServicesBasedOnFilters}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            label="Filter by location"
            value={locationFilter}
            fullWidth
            onChange={(event) => handleFilterInputsChange(event, "location")}
            onKeyDown={shouldFilterCallApi}
            onBlur={fetchServicesBasedOnFilters}
          />
        </Grid>

        <Grid item xs={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Slider
            style={{ width: "90%" }}
            getAriaLabel={() => "Price range"}
            value={priceFilter}
            valueLabelDisplay="on"
            marks={priceSliderMarks}
            onChange={handleFilterSliderChange}
            min={0}
            max={100}
            step={10}
            disableSwap
            onChangeCommitted={fetchServicesBasedOnFilters}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {renderServiceList}

        {userId && (
          <Grid item xs="4">
            <Card>
              <a
                href="/services/create"
                className="services-list__add-service"
              >
                <HiOutlinePlusCircle />
              </a>
            </Card>
          </Grid>
        )}

        <Loader show={isLoading} />
      </Grid>
    </Container>
  )
};

export default ListServices;
