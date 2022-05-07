// Author: Viren Babubhai Malavia (B00895669)

import React, { useState, useContext, useEffect } from "react";
import { Button, Dialog } from "@mui/material";
import axios_api from "../../../common/axios";
import { AppContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../common/constants";
import { toast } from "react-toastify";

function FavoriteButton(props) {
  const {
    state: { authenticated, userId, currentUser },
  } = useContext(AppContext);
  let navigate = useNavigate();

  const favMsg = "Add to Favorites";
  const msgColor = "white";

  const [favMsgState, setFavMsgState] = useState(favMsg);
  const [msgColorState, setMsgColorState] = useState(msgColor);

  const [favAddedMessage, setFavAddedMessage] = useState(false);

  const [tempState, setTempState] = useState(0);

  const handleButton = (event) => {
    if (!authenticated) {
      navigate(ROUTES.LOGIN);
    } else {
      setTempState(tempState + 1);
    }
  };

  const handleDialog = (event) => {
    setFavAddedMessage(false);
  };

  useEffect(async () => {
    if (tempState != 0) {
      axios_api
        .get(`/favorites/${userId}/${props.propertyId}`)
        .then((res) => {
          if (res.data.success) {
            axios_api
              .delete(`/favorites/${userId}/${props.propertyId}`)
              .then((res) => {
                if (res.data.success == true) {
                  toast.success("Post Removed from Favorites!");
                  setFavMsgState("Add to Favorites");
                  setMsgColorState("white");
                }
              });
          } else {
            const favReqBody = {
              user_id: userId,
              property_id: props.propertyId,
            };
            axios_api.post("/favorites/", favReqBody).then((res) => {
              if (res.data.success == true) {
                toast.success("Post Added to Favorites!");
                setFavMsgState("Remove from Favorites");
                setMsgColorState("red");
              }
            });
          }
        })
        .catch((err) => {});
    }
  }, [tempState]);

  useEffect(async () => {
    axios_api
      .get(`/favorites/${userId}/${props.propertyId}`)
      .then((res) => {
        if (res.data.success && userId) {
          setFavMsgState("Remove from Favorites");
          setMsgColorState("red");
        } else {
          setFavMsgState("Add to Favorites");
          setMsgColorState("white");
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2, mr: 2 }}
        onClick={handleButton}
      >
        <svg
          style={{ marginRight: "4px" }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill={msgColorState}
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
        {favMsgState}
      </Button>
      {/* <Dialog open={favAddedMessage} fullWidth={true}>
        <p style={{ textAlign: "center", margin: "20px" }}>
          Post Added To Favorites!
        </p>
        <div style={{ textAlign: "center" }}>
          <Button
            variant={"contained"}
            style={{ marginBottom: "20px", width: "200px" }}
            onClick={handleDialog}
          >
            Close
          </Button>
        </div>
      </Dialog> */}
    </div>
  );
}

export default FavoriteButton;
