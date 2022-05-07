// Author: Anuj Dev (B00900887)

import { ROUTES } from "../common/constants";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

function PrivateRoutes() {
  const privatePages = [
    // {
    //   pageLink: ROUTES.USER_PROFILE,
    //   view: USER_PROFILE,
    // },
  ];

  //Private routes will be defined here
  const renderRoutes = (
    <Routes>
      {privatePages.map((page, index) => {
        return (
          <Route
            exact
            path={page.pageLink}
            element={<page.view />}
            key={index}
          />
        );
      })}
      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ERROR} />} />
    </Routes>
  );

  return renderRoutes;
}

export default PrivateRoutes;
