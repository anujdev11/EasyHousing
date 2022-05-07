// Author: Anuj Dev (B00900887)

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as ActionTypes from "../common/actionTypes";
import { AppContext } from "../context/userContext";
import { ROUTES } from "../common/constants";

const Logout = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: ActionTypes.LOGOUT });
    navigate(ROUTES.HOMEPAGE);
  }, []);

  return <div />;
};

export default Logout;
