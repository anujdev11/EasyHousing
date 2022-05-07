// Author: Anuj Dev (B00900887)

import React, { useContext, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

//! User Files

import * as ActionTypes from "../common/actionTypes";
import jwtDecode from "jwt-decode";
import App from "../app/App";
import Error from "../common/error";
import { AppContext } from "../context/userContext";
import { ROUTES, TOKEN } from "../common/constants";
import Login from "../pages/UserManagement/Login/Login";
import AddProperty from "../pages/PropertyManagement/AddProperty/AddProperty";
import ViewProperty from "../pages/PropertyManagement/ViewProperty/ViewProperty";
import Signup from "../pages/UserManagement/Signup/Signup";
import EditUserProfile from "../pages/UserProfile/EditProfile";
import Logout from "../Components/Logout";
import ChangePassword from "../pages/UserProfile/ChangePassword";
import Profile from "../pages/UserProfile/Profile";
import BookAppointment from "../pages/Appointment/BookAppointment/BookAppointment";
import CancelAppointment from "../pages/Appointment/CancelAppointment/CancelAppointment";
import Review from "../pages/Review/Review";
import ShowReviews from "../pages/Review/ShowReviews";
import Ratings from "../pages/Rating/Ratings";
import AllServices from "../pages/AllServices/AllServices";
import CreateService from "../pages/CreateService/CreateService";
import EditService from "../pages/EditService/EditService";
import MyServices from "../pages/MyServices/MyServices";

import ForgetPassword from "../pages/UserManagement/components/ForgetPassword";
import ResetPassword from "../pages/UserManagement/components/ResetPassword";
import Appointments from "../pages/Appointment/Appointments/Appointments";

import ViewFavorites from "../pages/Favorites/ViewFavorites/ViewFavorites";
import FavoriteInfo from "../pages/Favorites/ViewFavorites/FavoriteInfo";

// import PrivateRoute from "PrivateRoute";
import Homepage from "../pages/HomePage/index";
import RoommateHomepage from "../pages/RoommateFinder/RoomateHomePage";
import MyListings from "../pages/RoommateFinder/MyListings";
import EditRoomatesAd from "../pages/RoommateFinder/EditRoomatesAd";
import PropertyInfo from "../pages/PropertyManagement/ViewProperty/PropertyInfo";
import UserPropertyListing from "../pages/PropertyManagement/UserProperty/UserPropertyListing";
import SuperAdminLogin from "../pages/UserManagement/Login/SuperAdminLogin";

import ViewAdminPage from "../pages/AdminManagement/ViewAdminPage/ViewAdminPage";
import AdminPropertyDetails from "../pages/AdminManagement/ViewAdminPage/AdminPropertyDetails";
import SingleServicePage from "../pages/SingleServicePage/SingleServicePage";

function Routing() {
  const { initializeAuth, dispatch } = useContext(AppContext);
  const location = useLocation();
  const openPages = [
    {
      pageLink: ROUTES.HOMEPAGE,
      view: Homepage,
    },
    {
      pageLink: ROUTES.LOGIN,
      view: Login,
    },
    {
      pageLink: ROUTES.SUPER_ADMIN_LOGIN,
      view: SuperAdminLogin,
    },
    {
      pageLink: ROUTES.MY_SERVICES,
      view: MyServices,
    },
    {
      pageLink: ROUTES.SIGNUP,
      view: Signup,
    },
    {
      pageLink: ROUTES.ADD_PROPERTY,
      view: AddProperty,
    },
    {
      pageLink: ROUTES.UPDATE_PROPERTY,
      view: AddProperty,
    },
    {
      pageLink: ROUTES.PROPERTY_LISTING,
      view: ViewProperty,
    },
    {
      pageLink: ROUTES.USERS_PROPERTY,
      view: UserPropertyListing,
    },
    {
      pageLink: ROUTES.PROPERTY_DETAILS,
      view: PropertyInfo,
    },
    {
      pageLink: ROUTES.FORGOT_PASSWORD,
      view: ForgetPassword,
    },
    {
      pageLink: ROUTES.RESET_PASSWORD,
      view: ResetPassword,
    },
    {
      pageLink: ROUTES.PROFILE,
      view: Profile,
    },
    {
      pageLink: ROUTES.EDIT_PROFILE,
      view: EditUserProfile,
    },
    {
      pageLink: ROUTES.CHANGEPASSWORD,
      view: ChangePassword,
    },
    {
      pageLink: ROUTES.LOGOUT,
      view: Logout,
    },
    {
      pageLink: ROUTES.BOOK_APPOINTMENT,
      view: BookAppointment,
    },
    {
      pageLink: ROUTES.CANCEL_APPOINTMENT,
      view: CancelAppointment,
    },
    {
      pageLink: ROUTES.REVIEW,
      view: Review,
    },
    {
      pageLink: ROUTES.RATING,
      view: Ratings,
    },
    {
      pageLink: ROUTES.VIEW_SERVICES,
      view: AllServices,
    },
    {
      pageLink: ROUTES.ADD_SERVICE,
      view: CreateService,
    },
    {
      pageLink: ROUTES.EDIT_SERVICE,
      view: EditService,
    },
    {
      pageLink: ROUTES.APPOINTMENTS,
      view: Appointments,
    },
    {
      pageLink: ROUTES.VIEW_FAVORITES,
      view: ViewFavorites,
    },
    {
      pageLink: ROUTES.VIEW_FAVORITES_DETAILS,
      view: FavoriteInfo,
    },
    {
      pageLink: ROUTES.ERROR,
      view: Error,
    },
    {
      pageLink: ROUTES.ROOMMATE_FINDER,
      view: RoommateHomepage,
    },
    {
      pageLink: ROUTES.ROOMMATE_FINDER_MY_LISTINGS,
      view: MyListings,
    },
    {
      pageLink: ROUTES.ROOMMATE_FINDER_EDIT_LISTINGS,
      view: EditRoomatesAd,
    },
    {
      pageLink: ROUTES.SHOW_REVIEWS,
      view: ShowReviews,
    },
    {
      pageLink: ROUTES.VIEW_ADMIN_PAGE,
      view: ViewAdminPage,
    },
    {
      pageLink: ROUTES.VIEW_ADMIN_PAGE_POSTDETAILS,
      view: AdminPropertyDetails,
    },
    {
      pageLink: ROUTES.VIEW_SINGLE_SERVICE,
      view: SingleServicePage
    },
    {
      pageLink: ROUTES.MY_SERVICES,
      view: MyServices,
    }
  ];

  useEffect(() => {
    initializeAuth();
    if (localStorage.getItem(TOKEN)) {
      const token = localStorage.getItem(TOKEN);
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp;
      const currentTime = Date.now();

      if (expiresAt < currentTime / 1000) {
        dispatch({ type: ActionTypes.LOGOUT });
      }
    }
  }, []);

  const routes = (
    <Routes location={location}>
      {openPages.map((page, index) => {
        return (
          <Route
            exact
            path={page.pageLink}
            element={<page.view />}
            key={index}
          />
        );
      })}
      {/* <Route exact path={ROUTES.HOMEPAGE} element={<PrivateRoute />}>
        <Route exact path={ROUTES.MAIN} element={<App />} />
      </Route> */}
      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ERROR} />} />
    </Routes>
  );

  return <div className="container">{routes}</div>;
}

export default Routing;
