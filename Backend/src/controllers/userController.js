// Author: Anuj Dev (B00900887)

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SALT_VALUE, WEBSITE_LINK, JWT_SECRET } = require("../config/index");
const { users } = require("../models");
const { sendEmail } = require("../utils/sendEmail");
const { APP_USER, SUPER_ADMIN } = require("../config/constants");
const passport = require("passport");
const { response } = require("express");

//User Root
const userRoot = (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    res
      .status(200)
      .json({ message: "Welcome to User Management Module", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

//User registration of app-user

const registerAppUser = async (req, res) => {
  await userRegistration(req.body, APP_USER, res);
};

//User registration of Super Admin

const registerSuperAdmin = async (req, res) => {
  await userRegistration(req.body, SUPER_ADMIN, res);
};

//User Login of app-user

const loginAppUser = async (req, res) => {
  await userLogin(req.body, APP_USER, res);
};

//User Login of Super Admin

const loginSuperAdmin = async (req, res) => {
  await userLogin(req.body, SUPER_ADMIN, res);
};

// User Registration with different Roles
const userRegistration = async (user, role, res) => {
  try {
    res.setHeader("Content_type", "application/json");

    let EmailExists = await isEmailExists(user.email);
    if (EmailExists) {
      return res.status(400).json({
        message: "Email is already taken",
        success: false,
      });
    }
    const password = await bcrypt.hash(user.password, Number(SALT_VALUE));
    const userObj = {
      ...user,
      password,
      role,
      isVerified: false,
    };
    users.create(userObj);
    sendEmail(
      user.email,
      "Welcome to Easy Housing",
      {
        fullname: user.firstName + " " + user.lastName,
        link: WEBSITE_LINK,
      },
      "../utils/templates/welcome.handlebars"
    );
    return res.status(201).json({
      message: "User is registered successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

// User Registration with different Roles
const userLogin = async (user, role, res) => {
  try {
    res.setHeader("Content_type", "application/json");

    const userExist = await users.findOne({
      where: { email: user.email },
    });
    if (!userExist) {
      return res.status(400).json({
        message: "Email Does not Exist with this Email",
        success: false,
      });
    }
    if (role != userExist.role) {
      return res.status(403).json({
        message: "You are not authorized to perform this operation!",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userExist.password
    );

    if (isPasswordCorrect) {
      jwtPayload = {
        id: userExist.id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        role: userExist.role,
      };
      let token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "1h" });
      let response = {
        id: user.id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        imgURL: userExist.imgURL,
        phoneNumber: userExist.phoneNumber,
        role: userExist.role,
        token: `Bearer ${token}`,
        expiresIn: 1,
      };

      return res.status(200).json({
        ...response,
        message: "Logged In successfully!",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Password is Invalid",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

// Check if Email Exists
const isEmailExists = async (email) => {
  let user = await users.findOne({
    where: {
      email: email,
    },
  });
  if (user) return true;
  else return false;
};

/**
 * @DESC middleware for authentication
 */

const isUserVerified = passport.authenticate("jwt", { session: false });

// User Profile Controller

const userProfile = async (req, res) => {
  try {
    const user = req.user;
    res.setHeader("Content_type", "application/json");
    let userData = {
      user_id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imgURL: user.imgURL,
      phoneNumber: user.phoneNumber,
      role: user.role,
      updatedAt: user.updatedAt,
      createdAt: user.createdAt,
    };
    res.status(200).json({
      message: "User Fetched Successfully",
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Change Password Controller

const forgotPassword = async (req, res) => {
  try {
    const user = req.body;
    res.setHeader("Content_type", "application/json");

    const userExist = await users.findOne({
      where: { email: user.email },
    });
    if (!userExist) {
      return res.status(400).json({
        message: "Email Does not Exist with this Email",
        success: false,
      });
    }
    const jwtPayload = {
      id: userExist.id,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      email: userExist.email,
      role: userExist.role,
    };
    let token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "1h" });
    const link = `${WEBSITE_LINK}/api/user/reset/${userExist.id}/${token}`;
    sendEmail(
      userExist.email,
      "Reset Password For Easy Housing",
      {
        fullname: userExist.firstName + " " + userExist.lastName,
        link: link,
        web_link: WEBSITE_LINK,
      },
      "../utils/templates/resetPassword.handlebars"
    );
    res.status(200).json({
      message: "Forget Password Email Sent Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// Change Password Controller

const changePassword = async (req, res) => {
  try {
    const user = req.user;
    res.setHeader("Content_type", "application/json");

    let userObj = await getUserById(user.id);
    if (!userObj) {
      return res.status(400).json({
        message: "User Does not Exists",
        success: false,
      });
    }
    const isOldPasswordCorrect = await bcrypt.compare(
      req.body.oldPassword,
      userObj.password
    );
    const isNewPasswordSame = await bcrypt.compare(
      req.body.newPassword,
      userObj.password
    );

    if (!isOldPasswordCorrect) {
      return res.status(400).json({
        message: "Old Password Does Not Match",
        success: false,
      });
    }
    if (isNewPasswordSame) {
      return res.status(400).json({
        message: "Your Current Password and New Password is Same",
        success: false,
      });
    }

    userObj.password = await bcrypt.hash(
      req.body.newPassword,
      Number(SALT_VALUE)
    );
    await userObj.save();
    res.status(200).json({
      message: "Password Changed Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const resetPassword = async (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");

    let userObj = await getUserById(req.params.userId);
    var isVerified = jwt.verify(req.params.jwtToken, JWT_SECRET);
    if (!isVerified) {
      return res.status(400).json({
        message: "User Token is Not Valid",
        success: false,
      });
    }
    if (!userObj) {
      return res.status(400).json({
        message: "User Does not Exists",
        success: false,
      });
    }
    userObj.password = await bcrypt.hash(
      req.body.newPassword,
      Number(SALT_VALUE)
    );
    await userObj.save();
    sendEmail(
      userObj.email,
      "Password Reset Sccessfully",
      {
        fullname: userObj.firstName + " " + userObj.lastName,
        link: WEBSITE_LINK,
      },
      "../utils/templates/resetPasswordConfirmation.handlebars"
    );
    res.status(200).json({
      message: "Password Reset Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getUserById = async (user_id) => {
  return await users.findByPk(user_id);
};

// User Updation with different Roles
const updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    res.setHeader("Content_type", "application/json");

    let userObj = await getUserById(id);
    if (!userObj) {
      return res.status(400).json({
        message: "User Does not Exists",
        success: false,
      });
    }

    await userObj.update(req.body, { where: { id: id } });
    return res.status(201).json({
      message: "User is updated successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

// User Deletion with different Roles
const deleteUserProfile = async (req, res) => {
  try {
    const id = req.params.id;
    res.setHeader("Content_type", "application/json");

    let userObj = await getUserById(id);
    if (!userObj) {
      return res.status(400).json({
        message: "User Does not Exists",
        success: false,
      });
    }
    await userObj.destroy();
    return res.status(200).json({
      message: "User deleted successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};

module.exports = {
  userRoot,
  registerAppUser,
  registerSuperAdmin,
  loginAppUser,
  loginSuperAdmin,
  isUserVerified,
  userProfile,
  changePassword,
  updateProfile,
  deleteUserProfile,
  forgotPassword,
  resetPassword,
};
