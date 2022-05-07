import React from "react";
import ReactDOM from "react-dom";
import { AppContextProvider } from "./context/userContext";
import { ThemeProvider } from "@mui/material";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../src/common/theme";

import Routes from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes />
          <ToastContainer
            position="bottom-left"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            theme="colored"
            hideProgressBar
          />
        </ThemeProvider>
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// reportWebVitals();
