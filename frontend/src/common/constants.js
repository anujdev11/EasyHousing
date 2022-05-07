// Author: Anuj Dev (B00900887)

/* ROUTERS  */
export const ROUTES = {
  // COMMON ROUTES
  HOMEPAGE: "/",
  LOGIN: "/login",
  SUPER_ADMIN_LOGIN: "/loginSuperAdmin",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/api/user/reset/:userId/:jwtToken",
  SIGNUP: "/signup",
  ADD_PROPERTY: "/add_property",
  UPDATE_PROPERTY: "/update_property/:propertyId",
  PROPERTY_LISTING: "/property_list",
  PROPERTY_DETAILS: "/propertyDetails/:propertyId",
  USERS_PROPERTY: "/user_property",
  PROFILE: "/profile",
  EDIT_PROFILE: "/editprofile",
  CHANGEPASSWORD: "/changepassword",
  LOGOUT: "/logout",
  ROOMMATE_FINDER_MY_LISTINGS: "/myListingPage",
  REVIEW: "/review",
  RATING: "/rating",
  BOOK_APPOINTMENT: "/book-appointment/:userId/:propertyId",
  CANCEL_APPOINTMENT: "/cancel-appointment/:userId/:propertyId",
  APPOINTMENTS: "/appointments",
  VIEW_SERVICES: "/services",
  ADD_SERVICE: "/services/create",
  EDIT_SERVICE: "services/edit/:id",
  MY_SERVICES: "/myservices",
  VIEW_SINGLE_SERVICE: "/services/:id",
  VIEW_FAVORITES: "/view_favorites",
  VIEW_FAVORITES_DETAILS: "/view_favorites_details/:propertyId",
  SHOW_REVIEWS: "/show_reviews/:propertyId",
  VIEW_ADMIN_PAGE: "/admin_page",
  VIEW_ADMIN_PAGE_POSTDETAILS: "/admin_page_postdetails/:propertyId",

  NOT_FOUND: "*",
  ERROR: "/error",
  ROOMMATE_FINDER_EDIT_LISTINGS: "/editListingPage",

  //Private Route
  USER_PROFILE: "/profile",
  ROOMMATE_FINDER: "/roommateHomepage",
  // USER_PROFILE: "/profile",
};

/* Authentication */
export const TOKEN = "TOKEN";
export const USER = "USER";
export const ADMIN = "ADMIN";
export const USER_ID = "USER_ID";

export const APP_ROLES = {
  SUPER_ADMIN: "super_admin",
  APP_USER: "app_user",
};
