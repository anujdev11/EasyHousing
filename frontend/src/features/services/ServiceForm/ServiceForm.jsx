import React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import Axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../../context/userContext";
import "./ServiceForm.css";
import Loader from "../../ui/Loader/Loader";
import axios_api from "../../../common/axios";

const ServiceForm = (props) => {
  const {
    state: { userId }
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [formError, setFormError] = React.useState([]);
  const [formState, setFormState] = React.useState(props.defaultFormFieldsState || {
    title: "",
    description: "",
    location: "",
    email: "",
    price: ""
  });
  const [savedImageName, setSavedImageName] = React.useState(props.savedImageName || "")

  const updateSelectedFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (props.mode === "edit") {
      setSavedImageName("");
    }
  }

  const validateServiceForm = (values) => {

    // ref: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const {title, description, location, email, price, image, isImageUpdated} = values;

    let validationErrors = [];

    if (title === undefined || title === null || title.length === 0) {
      validationErrors.push("Title cannot be empty.");
    }
 
    if (description === undefined || description === null || description.length === 0) {
      validationErrors.push("Description cannot be empty.");
    }
 
    if (location === undefined || location === null || location.length === 0) {
      validationErrors.push("Location cannot be empty.");
    }
 
    if (email === undefined || email === null || email.length === 0) {
      validationErrors.push("Email cannot be empty.");
    } else if (!emailRegex.test(email)) {
      validationErrors.push("Email should be valid.");
    }

    if (price === undefined || price === null || price.length === 0) {
      validationErrors.push("Price cannot be empty.");
    }

    if (isImageUpdated && (image === undefined || image === null)) {
      validationErrors.push("Please select an image");
    } else if (isImageUpdated && !image.type.startsWith("image/")) {
      validationErrors.push("The file uploaded should be an image");
    }

    return validationErrors;
  }

  const uploadImageAndGetURI = (image) => {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios_api.post("/properties/uploadImage", formData)
        if (response.status === 200) {
          console.log(response.data);
          resolve(response.data);
        } else {
          reject(response);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const title = e.target.title.value;
    const description = e.target.description.value;
    const location = e.target.location.value;
    const email = e.target.email.value;
    const price = e.target.price.value;
    const image = e.target.serviceFile.files[0];
    const isImageUpdated = savedImageName.length === 0;

    const validationErrors = validateServiceForm({
      title,
      description,
      location,
      email,
      price,
      image,
      isImageUpdated
    });

    if (validationErrors.length !== 0) {
      setFormError(validationErrors);
      setIsLoading(false);
      return;
    } else {
      setFormError([]);
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("price", price);
    formData.append("userid",userId);

    if (isImageUpdated) {
      const url = await uploadImageAndGetURI(image);
      formData.append("image", url);
    } else {
      formData.append("image", savedImageName);
    }

    if (props.mode === "edit") {
      // edit service
      axios_api.put(`/services/${props.serviceId}`, formData)
        .then((response) => {
          if (response.status === 200) {
            window.location = "/services";
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    } else {
      // new service
      axios_api.post("/services/", formData)
        .then((response) => {
          if (response.status === 200) {
            window.location = "/services";
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  }

  const handleFormStateValueChange = (fieldName, value) => {
    const currentFormState = {...formState};
    currentFormState[fieldName] = value;
    setFormState(currentFormState);
  }

  return (
    <div className="service-form">
      <form onSubmit={handleFormSubmit}>
        <h1>Add a service</h1>

        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={formState.title}
          onChange={(e) => handleFormStateValueChange("title", e.target.value)}
        />

        
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={formState.description}
          onChange={(e) => handleFormStateValueChange("description", e.target.value)}
        />

        <input
          type="text"
          name="location"
          id="location"
          placeholder="Location"
          value={formState.location}
          onChange={(e) => handleFormStateValueChange("location", e.target.value)}
        />

        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={formState.email}
          onChange={(e) => handleFormStateValueChange("email", e.target.value)}
        />

        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={formState.price}
          onChange={(e) => handleFormStateValueChange("price", e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          name="serviceFile"
          id="serviceFile"
          placeholder="Title"
          onChange={updateSelectedFile}
        />

        <label htmlFor="serviceFile" className="service-file-label">
          <HiOutlinePhotograph className="icon" />
          {(selectedFile || savedImageName) ? (
            <>
              <span>{selectedFile ? selectedFile.name : savedImageName}</span>
            </>
          ) : (
            <>
              <span>Add service cover image</span>
            </>
          )}
        </label>

        {formError.length > 0 ? (
          <ul className="form-error">
            {formError.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ) : null}

        <input
          type="submit"
          name="submit"
          id="submit"
          value="Post Ad"
        />
      </form>
      <Loader show={isLoading} />
    </div>
  )
}

export default ServiceForm;
